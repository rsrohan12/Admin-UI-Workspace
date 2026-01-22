import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const GET_COLONY_KEY = "fetch-colony";

export const fetchColony = async (id: string) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    // const response = await backendClient.get(`/admin/user/admin/${id}`);
    // return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
