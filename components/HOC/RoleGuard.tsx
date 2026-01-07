"use client";
import { IRootState } from '@/store';
import { TUser } from '@/types';
import { useRouter } from 'next/navigation'; 
import { useEffect, ComponentType } from 'react';
import { useSelector } from 'react-redux';

type RoleGuardHOC = <P extends object>(
  Component: ComponentType<P>,
  allowedRoles: string[],
  redirectRoute: string
) => ComponentType<P>;

const withRoleGuard: RoleGuardHOC = (Component, allowedRoles, redirectRoute) => {
  return function RoleGuard(props: any) {
    const router = useRouter();
    const userSession = useSelector((state: IRootState) => state.auth);
    const userDetails:TUser = userSession?.user!;

    useEffect(() => {
      if (userDetails && !allowedRoles.includes(userDetails.user.role)) {
        router.replace(redirectRoute);
      }
    }, [userDetails, allowedRoles, redirectRoute, router]);

    return userDetails && allowedRoles.includes(userDetails.user.role) ? (
      <Component {...props} />
    ) : null;
  };
};

export default withRoleGuard;
