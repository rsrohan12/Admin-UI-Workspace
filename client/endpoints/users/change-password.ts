import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const CHANGE_USER_PASSWORD_KEY = "change-user-password";

export type TChangeUserPassword = {
  old_password: string;
  new_password: string;
};

export const changeUserPasswordRequest = async (
  payload: TChangeUserPassword
) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/change-password`,
      payload
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
