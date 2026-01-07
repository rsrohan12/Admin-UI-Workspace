import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const ADD_USER_KEY = "add-user";

export type TAddUser = {
  email: string;
  password: string;
  full_name: string;
  contact_number: string;
  role: string;
  address: string;
  active: string;
};

export const addUserRequest = async (payload: TAddUser) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post("/admin/user/add", payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
