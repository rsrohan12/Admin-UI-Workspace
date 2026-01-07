import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";
import { TServerResponseWithPagination } from "@/types";
import { TEditColony } from "./edit-colony";

export const GET_COLONIES_KEY = "fetch-colony-list";

// export const fetchColony = async (id: string) => {
//   try {
//       const response = await backendClient.get<
//         TServerResponseWithPagination<TEditColony>
//       >(
//         `/admin/user/list?size=${payload?.size}&skip=${payload?.skip}&search=${
//           payload?.search
//         }&sorting=${payload?.sorting ?? ''}&trashOnly=${
//           payload?.trashOnly ?? ''
//         }`,
//       );
//       return response?.data?.data;
//     } catch (error) {
//       throw error;
//     } finally {
//       useGlobalLoader.getState().setShowLoader(false);
//     }
// };
