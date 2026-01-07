import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useSession } from '@/hooks';
import toast from 'react-hot-toast';

export type TErrorFromServer = {
  success: boolean;
  message: string;
  data: any;
};

export const backendClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  backendClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  typeof window !== 'undefined' && localStorage.setItem('token', token);
};

if (
  typeof window !== 'undefined' &&
  localStorage &&
  localStorage.getItem('token')
) {
  backendClient.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('token')}`;
}

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  const responseData = error.response?.data as TErrorFromServer | undefined;

  const msg =
    Array.isArray(responseData?.data?.details) &&
    responseData?.data?.details[0]?.message
      ? responseData.data.details[0].message
      : responseData?.message;

  if (!!msg && error.config?.method !== 'get') {
    toast.error(msg);
  }
if (responseData && Array.isArray(responseData?.data)) {
  const list = responseData?.data;
  const hasEmail = list.some((item: any) => !!item.email);

  if (!hasEmail) {
    // CLIENT branch
    const clientTasks: Record<string, string[]> = {};
    list.forEach((item: any) => {
      const client = item.client_name ?? 'Unknown Client';
      if (!clientTasks[client]) clientTasks[client] = [];
      if (item.task_name) clientTasks[client].push(item.task_name);
    });

    const hasAnyTask = Object.values(clientTasks).some(tasks => tasks.length > 0);

    if (hasAnyTask) {
      // Show tree format
      const treeMsg = Object.entries(clientTasks)
        .map(([client, tasks], idx) => {
          const taskLines = tasks.map(task => `    • ${task}`).join('\n');
          return `${idx + 1}. ${client}\n${taskLines}`;
        })
        .join('\n\n');

      toast.error(
        `Assigned to the following client(s) and their tasks:\n\n${treeMsg}`,
      );
      return Promise.reject(error);
    } else {
      // No tasks → just show client list
      const clientList = Object.keys(clientTasks)
        .map((client, idx) => `${idx + 1}. ${client}`)
        .join('\n');

      toast.error(`Assigned to the following client(s):\n${clientList}`);
      return Promise.reject(error);
    }
  }

  // EMPLOYEE branch
  if (hasEmail) {
    const listItems = list.map((item: any, index: number) => {
      return `${index + 1}. ${item.email ?? item.name ?? 'Unknown'}`;
    });

    toast.error(
      `Assigned to the following employee(s):\n${listItems.join('\n')}`,
    );
    return Promise.reject(error);
  }
}



  if (error?.response?.status === 401) {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }

  return Promise.reject(error);
};

const onRequest = (requestConfig: InternalAxiosRequestConfig) => requestConfig;
backendClient.interceptors.response.use(onResponse, onResponseError);
backendClient.interceptors.request.use(onRequest);
