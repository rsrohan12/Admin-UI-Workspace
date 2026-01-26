import { backendClient } from '@/client/backendClient';
import { useGlobalLoader } from '@/hooks';

export const DELETE_REPORT_KEY = 'delete-report';

export const deleteReportRequest = async (ids: number[]) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete(`/admin/user/delete`, {
      data: { ids },
    });
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
