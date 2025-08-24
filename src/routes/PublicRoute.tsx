import { Navigate } from "react-router";

import { role } from "@/constant/constant";
import { useMeQuery } from "@/redux/features/auth.api";
import type { JSX } from "react";

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const { data } = useMeQuery(undefined)

  const user = data?.data

  if (user) {
    // user is already logged in → redirect based on role
    if (user.role === role.admin) return <Navigate to="/admin" replace />;
    if (user.role === role.receiver) return <Navigate to="/receiver" replace />;
    if (user.role === role.sender) return <Navigate to="/sender" replace />;
    if(!user.role){
        return <Navigate to={'/login'} />
    }
  }

  return children;
}
