import { PropsWithChildren } from 'react';

// not used in this project! propably we can remove it
export const IfLogged = (props: PropsWithChildren<any>) => {
  return !!localStorage.getItem('token') ?
    <>{props.children}</> :
    null;
};

