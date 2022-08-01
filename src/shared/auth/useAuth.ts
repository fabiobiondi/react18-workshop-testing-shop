/***
 * TODO:
 * THIS TEST IS A DRAFT (worked in another project)
 * BUT SHOULD WORKS FINE
 */

import Axios from 'axios';
import { Auth, Credentials } from '../../model/auth';
import { getItemFromLocalStorage, removeItemLocalStorage, setItemLocalStorage } from './localstorage.utils';

export const url = 'http://localhost:3001/login';

export function useAuth() {
  function signIn( params: Credentials): Promise<Auth> {

    // const api = `${url}?username=${params.username}&password=${params.password}`;
    const api = `${url}`;

    return Axios.get<Auth>(api)
      .then(res => {
        setItemLocalStorage('token', res.data.accessToken);
        return res.data
      })
  }

  function signOut() {
    removeItemLocalStorage('token')
  }

  function isLogged(): boolean {
    return !!getItemFromLocalStorage('token')
  }

  return {
    signIn,
    signOut,
    isLogged
  }
}
