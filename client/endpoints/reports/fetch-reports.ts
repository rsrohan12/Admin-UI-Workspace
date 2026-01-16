import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const GET_REPORTS_KEY = "fetch-reports";

export const fetchReportsList = async (payload: any) => {
  // try {
  //     const response = await backendClient.get<
  //       TServerResponseWithPagination<TUser>
  //     >(
  //       `/admin/user/list?size=${payload?.size}&skip=${payload?.skip}&search=${
  //         payload?.search
  //       }&sorting=${payload?.sorting ?? ''}&trashOnly=${
  //         payload?.trashOnly ?? ''
  //       }`,
  //     );
  //     return response?.data?.data;
  //   } catch (error) {
  //     throw error;
  //   } finally {
  //     useGlobalLoader.getState().setShowLoader(false);
  //   }
};
