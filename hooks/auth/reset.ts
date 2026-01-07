import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { resetPasswordRequest } from "@/client/endpoints";
import { LINKS } from "@/constants";
import { useSession } from "@/hooks";
import toast from "react-hot-toast";

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation(resetPasswordRequest, {
    onSuccess: (res) => {
      toast.success(res.data.message)
      router.push(LINKS.login.route);
    },
  });
};
