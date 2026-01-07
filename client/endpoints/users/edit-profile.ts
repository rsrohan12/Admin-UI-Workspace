import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const EDIT_PROFILE_KEY = "edit-profile";

export type TEditUserProfile = {
  first_name?: string  | undefined;
  last_name?: string  | undefined;
  email?: string  | undefined;
  password?: string; 
  confirmPassword?: string;
  timezone?:string |  undefined;
};


export const editUserProfileRequest = async (payload: TEditUserProfile) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/edit-profile`,
      payload
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
