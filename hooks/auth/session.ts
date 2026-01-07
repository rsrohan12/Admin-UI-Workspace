import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "@/store";
import { createUserSession } from "@/store/authSlice";
import { setAuthToken } from "@/client/backendClient";
import { LINKS, NOTIFICATION_TITLE } from "@/constants";
import toast from "react-hot-toast";

export type TUserSession = {
  user: {
    timezone?: string | null | undefined;
    id?: TUserSession | null | undefined;
    first_name?: string  | undefined;
    role?:string | undefined;
    last_name?: string  | undefined;
    email?: string | undefined;
    password?:string;
  };
  accessToken: string;
  refreshToken: string;

};

export const useSession = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const userSession = useSelector((state: IRootState) => state.auth);
  const [session, setSession] = useState<TUserSession | null>(null);

  useEffect(() => {
    if (userSession?.user) {
      setSession(userSession?.user);
    } else {
      setSession(null);
    }
  }, [userSession, pathname]);

  const setUserSession = (res: TUserSession) => {
    setAuthToken(res.accessToken);
    dispatch(createUserSession(res));
  };

  const updateUserSession = (res: TUserSession) => {
    dispatch(createUserSession(res));
  };

  const logout = (showToast: boolean = true) => {
    setAuthToken("");
    dispatch(createUserSession(null));
    showToast && toast.success(NOTIFICATION_TITLE.LOGGED_OUT);
    router.push(LINKS.login.route);
  };

  return { session, setUserSession, logout, updateUserSession };
};
