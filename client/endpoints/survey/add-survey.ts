import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const ADD_SURVEY_KEY = "add-survey";

export type TAddSurvey = {
  block_name: string;
  sort_number: string;
};

export const addSurveyRequest = async (payload: TAddSurvey) => {
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
