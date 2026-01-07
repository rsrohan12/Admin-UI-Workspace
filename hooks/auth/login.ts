import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { loginRequest } from "@/client/endpoints";
import { LINKS } from "@/constants";
import { useSession } from "@/hooks";
import toast from "react-hot-toast";

export const useLogin = () => {
  const router = useRouter();
  const { setUserSession } = useSession();

  return useMutation(loginRequest, {
    onSuccess: (res) => {
      setUserSession(res?.data?.data);
      toast.success(res.data.message)

      if(res?.data?.data?.user?.role==="ADMIN"){
        router.push(LINKS.admin.route)
      }

      if(res?.data?.data?.user?.role==="SENIOR_MANAGER" || res?.data?.data?.user?.role==="MANAGER"){

        router.push(LINKS.employee_current_day.route)
      }
      if(res?.data?.data?.user?.role==="EMPLOYEE"){
        router.push(LINKS.employee_current_day.route)
      }

    },
  });
};