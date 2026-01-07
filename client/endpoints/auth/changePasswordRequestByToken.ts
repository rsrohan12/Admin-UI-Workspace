import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const CHANGE_PASSWORD_KEY = "change";

export type TChangePassword = {
  password: string;
  token: string;
};

export const changePasswordRequestByToken = async (payload: TChangePassword) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post("/admin//change-password-by-email", payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
