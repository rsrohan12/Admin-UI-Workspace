// import { backendClient } from "@/client/backendClient";
// import { useGlobalLoader } from "@/hooks";

// export const EDIT_COLONY_KEY = "edit-colony";

// export type TEditColony = {
//   id?: number;
//   colony_name: string;
//   marla: string;
// };

// export const editColonyRequest = async (payload: TEditColony) => {
// //   useGlobalLoader.getState().setShowLoader(true);
// //   const withoutId = { ...payload };
// //   delete withoutId?.id;
//   try {
//     // const response = await backendClient.post(
//     //   `/admin/user/edit/${payload.id}`,
//     //   withoutId
//     // );
//     // return response;
//   } catch (error) {
//     throw error;
//   } finally {
//     useGlobalLoader.getState().setShowLoader(false);
//   }
// };
