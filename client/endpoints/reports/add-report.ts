import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const ADD_REPORT_KEY = "add-report";

export type TAddReport = {
  block_name: string;
  sort_number: string;
};

export const addReportRequest = async (payload: TAddReport) => {
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
