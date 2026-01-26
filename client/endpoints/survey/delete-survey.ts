import { backendClient } from '@/client/backendClient';
import { useGlobalLoader } from '@/hooks';

export const DELETE_SURVEY_KEY = 'delete-survey';

export const deleteSurveyRequest = async (ids: number[]) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete(`/admin/user/delete`, {
      data: { ids },
    });
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
