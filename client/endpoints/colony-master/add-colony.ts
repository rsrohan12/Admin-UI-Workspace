import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const ADD_COLONY_KEY = "add-colony";

export type TAddColony = {
  colony_name: string;
  marla: string;
};

export const addColonykRequest = async (payload: TAddColony) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    // const response = await backendClient.post("/admin/user/add", payload);
    // return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
