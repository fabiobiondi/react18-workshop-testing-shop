/***
 * TODO:
 * THIS TEST IS A DRAFT (worked in another project)
 * BUT SHOULD WORKS FINE
 */

import Axios from "axios";
import { useState } from "react";
import { BASE_API } from "../../../core/config";
import { Auth, Credentials } from "../../../model/auth";
import {
  getItemFromLocalStorage,
  removeItemLocalStorage,
  setItemLocalStorage,
} from "../../utils/localstorage.utils";

export const url = "http://localhost:3001/login";

export function useAuth() {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  function signIn(params: Credentials) {
    setError(false);
    setPending(true);

    return Axios.post<Auth>(`${BASE_API}/login`, {
      email: params.username,
      password: params.password,
    })
      .then((res) => {
        console.log("ok");
        setItemLocalStorage("token", res.data.accessToken);
        return res.data;
      })
      .catch((err) => {
        setError(true);
        return err;
      })
      .finally(() => setPending(false));
  }

  function signInFake(params: Credentials): Promise<Auth> {
    // const api = `${url}?username=${params.username}&password=${params.password}`;
    const api = `${url}`;

    return Axios.get<Auth>(api).then((res) => {
      setItemLocalStorage("token", res.data.accessToken);
      return res.data;
    });
  }

  function signOut() {
    removeItemLocalStorage("token");
  }

  function isLogged(): boolean {
    return !!getItemFromLocalStorage("token");
  }

  return {
    signIn,
    signOut,
    isLogged,
    error,
    pending,
  };
}
