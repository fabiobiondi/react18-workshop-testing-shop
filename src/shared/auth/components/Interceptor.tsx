import {useInterceptor} from "../hooks/useInterceptor";
import {ExclamationCircleIcon} from "@heroicons/react/solid";

export function Interceptor() {
  const { error } = useInterceptor()
  return error ? <div className="flex justify-center items-center gap-x-4 p-2 bg-red-300">
    <ExclamationCircleIcon className="w-4 h-4" />
    There are some server errors!
  </div> : null;
}
