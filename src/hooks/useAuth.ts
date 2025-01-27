import React from "react";
import { AxiosError, AxiosResponse } from "axios";
import { AuthToken } from "../types";
import { useNavigate } from "react-router-dom";
import APP_HOOKS from "./0_AppHooks";
import ContextHooks from "../providers/0_ContextHooks";
import APP_CONSTANTS from "../constants/AppConstants";

export type UseAuth = () => {
  login: (value: { password: string; username: string }) => void;
  logout: () => void;
  loading: boolean;
  error: any;
};

export const useAuth: UseAuth = () => {
  const navigate = useNavigate();
  const { axios, loading } = ContextHooks.useAxiosContext();
  const { set, clear } = APP_HOOKS.useLocalStorage();
  const [error, setError] = React.useState(false);

  const login = React.useCallback(
    (value: { password: string; username: string }) => {
      setError(false);
      const { username, password } = value;
      axios &&
        axios
          .post(APP_CONSTANTS.API_ROUTES.LOGIN, { username, password })
          .then(({ data }: AxiosResponse<AuthToken>) => {
            set(APP_CONSTANTS.LOCAL_STORAGE.TOKEN, data);
            navigate(APP_CONSTANTS.APP_ROUTES.PAGES);
          })
          .catch(() => {
            setError(true);
          });
    },
    [axios, navigate, set]
  );

  const logout = React.useCallback(() => {
    setError(false);
    axios &&
      axios
        .post(APP_CONSTANTS.API_ROUTES.LOGOUT)
        .then(() => {
          clear();
          navigate(APP_CONSTANTS.APP_ROUTES.LOGIN);
        })
        .catch((err: AxiosError) => {
          setError(true);
        });
  }, [axios, clear, navigate]);

  return React.useMemo(
    () => ({ login, logout, loading, error }),
    [error, loading, login, logout]
  );
};
