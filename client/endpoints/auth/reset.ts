import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const RESET_PASSWORD_KEY = "reset";

export type TResetPassword = {
  email: string;
};

export const resetPasswordRequest = async (payload: TResetPassword) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post("/admin/reset-password", payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
