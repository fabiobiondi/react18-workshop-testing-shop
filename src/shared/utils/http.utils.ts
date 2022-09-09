import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { APP_CONFIG } from "../../core/config";

// TODO: LDP add mock of this service

function httpClientBuilder(baseUrl: string) {
  const get = <T>(url: string): Promise<T> =>
    axios.get<T>(`${baseUrl}${url}`).then((response) => response.data);

  const post = <T, D = any>(url: string, data?: D): Promise<T> =>
    axios.post<T>(`${baseUrl}${url}`, data).then((response) => response.data);

  const patch = <T>(url: string, data?: Partial<T>): Promise<T> =>
    axios.patch<T>(`${baseUrl}${url}`, data).then((response) => response.data);

  const remove = <T>(url: string): Promise<T> =>
    axios.delete<T>(`${baseUrl}${url}`).then((response) => response.data);

  const onRequest = (
    action: (request: AxiosRequestConfig<unknown>) => AxiosRequestConfig<any>
  ) => {
    const id = axios.interceptors.request.use(action);
    return () => {
      axios.interceptors.request.eject(id);
    };
  };

  const onResponse = (
    onFulfilled: (
      response: AxiosResponse<unknown, unknown>
    ) => AxiosResponse<unknown>,
    onRejected?: (error: any) => unknown
  ) => {
    const id = axios.interceptors.response.use(onFulfilled, onRejected);
    return () => {
      axios.interceptors.response.eject(id);
    };
  };

  return {
    get,
    post,
    patch,
    delete: remove,
    onRequest,
    onResponse,
  };
}

export const httpClient = httpClientBuilder(APP_CONFIG.baseApiUrl);
