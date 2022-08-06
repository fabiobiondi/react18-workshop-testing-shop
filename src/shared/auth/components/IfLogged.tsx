import { PropsWithChildren } from "react";

/**
 * HIDE DOM Element if USER is not logged
 * NOTE not used in this project! propably we can remove it
 */
export const IfLogged = (props: PropsWithChildren<any>) => {
  return !!localStorage.getItem("token") ? <>{props.children}</> : null;
};
