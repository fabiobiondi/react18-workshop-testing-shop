/***
 * TODO:
 * THIS TEST IS A DRAFT (worked in another project)
 * BUT SHOULD WORKS FINE
 */

import { useState } from "react";
import { Auth, Credentials, CredentialsDto } from "../../../model/auth";
import { httpClient } from "../../utils/http.utils";
import {
  getItemFromLocalStorage,
  removeItemLocalStorage,
  setItemLocalStorage,
} from "../../utils/localstorage.utils";

export function useAuth() {
  const [pending, setPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  async function signIn(params: Credentials): Promise<Auth> {
    setIsError(false);
    setPending(true);

    try {
      const res = await httpClient.post<Auth, CredentialsDto>(`/login`, {
        email: params.username,
        password: params.password,
      });
      setItemLocalStorage("token", res.accessToken);
      return res;
    } catch (err) {
      setIsError(true);
      console.log("error", err);
      throw err;
    } finally {
      setPending(false);
    }
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
    isError,
    pending,
  };
}
