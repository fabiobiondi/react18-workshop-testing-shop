import Axios from 'axios';
import React, {FormEvent, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth, Credentials } from '../../model/auth';
import { useAuth } from '../../shared/auth/useAuth';
import clsx from "clsx";
import {Spinner} from "../../shared/components/Spinner";


const INITIAL_STATE: Credentials = { username: '', password: '' };

export default function LoginPage() {
  const navigate = useNavigate()
  const { signIn, isLogged } = useAuth();
  const [formData, setFormData] = useState<Credentials>(INITIAL_STATE)
  const [dirty, setDirty] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (isLogged()) {
      navigate('/admin')
    }
  }, [isLogged, navigate])

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirty(true);
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  function loginHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setPending(true);

    signIn(formData)
      .then((res: Auth) => {
        navigate('/admin')
      })
      .catch(() => setError(true))
      .finally(() => setPending(false))
  }

  const isUserNameValid = formData.username.length > 3;
  const isPassValid = formData.password.length > 3;
  const isValid = isUserNameValid && isPassValid;


  return (
      <div className="mt-32  flex flex-col justify-center  sm:px-6 lg:px-8">

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div
            className={clsx(
              'py-8 px-4 shadow sm:rounded-lg sm:px-10',
              error ? 'bg-red-300' : 'bg-gray-50'
            )}
          >
            <form className="space-y-6" onSubmit={loginHandler}  >
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={onChangeHandler}
                    className={clsx(
                      'form-input',
                      { 'error': !isUserNameValid && dirty}
                    )}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={onChangeHandler}
                    className={clsx(
                      'form-input',
                      { 'error': !isPassValid && dirty}
                    )}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  disabled={!isValid}
                >
                  { pending ? <Spinner /> : 'Sign In'}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
  )
};
