import { backendClient } from '@/client/backendClient';
import { useGlobalLoader } from '@/hooks';

export const DELETE_BLOCK_KEY = 'delete-block';

export const deleteBLockRequest = async (ids: number[]) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    // const response = await backendClient.delete(`/admin/user/delete`, {
    //   data: { ids },
    // });
    // return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
