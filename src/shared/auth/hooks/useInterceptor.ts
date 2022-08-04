import Axios from 'axios';
import { useEffect, useState } from 'react';
import {getItemFromLocalStorage, removeItemLocalStorage} from "../../utils/localstorage.utils";
import { useNavigate } from "react-router-dom";

export const useInterceptor = () => {
  const [request, setRequest] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.interceptors.request.use( (config) => {
      let req = config;

      // inject Token in protected API only
      if (config.url?.includes('660')) {
        req = {
          ...config,
          headers: {
            ...config.headers,
            'Authorization': 'Bearer ' + getItemFromLocalStorage('token')
          }
        };
      }

      setError(false);
      setRequest(req)
      return req;
    });

    Axios.interceptors.response.use(
      (response) => {
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        console.log('ERROR', error)
        setError(true);
        switch(error.response.status) {
          // token expired
          case 401:
            removeItemLocalStorage('token')
            navigate('/home');
            break;
          // generic error
          default:
            navigate('/login');
            break;
        }
        return Promise.reject(error);
      });
    },
  [navigate]); // end useEffect

  function cleanError() {
    setError(false)
  }

  return {
    cleanError,
    request,
    error
  };
}
