import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpClient } from "../../utils/http.utils";
import {
  getItemFromLocalStorage,
  removeItemLocalStorage,
} from "../../utils/localstorage.utils";

export const useInterceptor = () => {
  const [request, setRequest] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onRequestUnsubscribe = httpClient.onRequest(config => {
      let req = config;

      // inject Token in protected API only
      if (config.url?.includes("660")) {
        req = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: "Bearer " + getItemFromLocalStorage("token"),
          },
        };
      }

      setError(false);
      setRequest(req);
      return req;
    });

    const onResponseUnsubscribe = httpClient.onResponse(
      response => {
        return response;
      },
      error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        console.log("ERROR", error);
        switch (error.response.status) {
          // token expired
          case 401:
            removeItemLocalStorage("token");
            navigate("/home");
            break;
          // generic error
          default:
            setError(true);
            break;
        }
        return Promise.reject(error);
      }
    );

    return () => {
      onRequestUnsubscribe();
      onResponseUnsubscribe();
    };
  }, [navigate]); // end useEffect

  function cleanError() {
    setError(false);
  }

  return {
    cleanError,
    request,
    error,
  };
};
