import React  from 'react';
import { Navigate } from 'react-router-dom';
import { PathRouteProps } from 'react-router/lib/components';
import {useAuth} from "./useAuth";

export const AuthGuard = ({ path, element }: PathRouteProps) => {
  const { isLogged } = useAuth();
  return isLogged() ?
    <div>{element}</div> :
    <Navigate to={path} />
};
