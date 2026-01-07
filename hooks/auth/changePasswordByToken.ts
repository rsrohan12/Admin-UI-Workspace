import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { changePasswordRequest } from "@/client/endpoints";
import { LINKS } from "@/constants";
import { useSession } from "@/hooks";
import { changePasswordRequestByToken } from "@/client/endpoints/auth/changePasswordRequestByToken";
import toast from "react-hot-toast";

export const useChangePasswordByToken = () => {
  const router = useRouter();

  return useMutation(changePasswordRequestByToken, {
    onSuccess: (res) => {
      toast.success(res.data.message)
      router.push(LINKS.login.route);
    },
  });
};
