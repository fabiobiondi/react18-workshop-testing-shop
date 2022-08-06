import { Navigate } from "react-router-dom";
import { PathRouteProps } from "react-router/lib/components";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoute = ({ path, element }: PathRouteProps) => {
  const { isLogged } = useAuth();
  return isLogged() ? <div>{element}</div> : <Navigate to={path} />;
};
