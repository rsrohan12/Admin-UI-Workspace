import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const ADD_BLOCK_KEY = "add-block";

export type TAddBlock = {
  block_name: string;
  sort_number: string;
};

export const addBlockRequest = async (payload: TAddBlock) => {
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
