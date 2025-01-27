import React from "react";
import { AxiosError, AxiosResponse } from "axios";
import { AuthToken } from "../types";
import { useNavigate } from "react-router-dom";
import { ApiRoutes, AppRoutes } from "../core/router";
import AppHooks from "./0_AppHooks";
import ContextHooks from "../providers/0_ContextHooks";
import APP_CONSTANTS from "../constants/AppConstants";

interface I {
  login: (value: { password: string; username: string }) => void;
  logout: () => void;
  loading: boolean;
  error: any;
}

export const useAuth = (): I => {
  const navigate = useNavigate();
  const { axios, loading } = ContextHooks.useAxiosContext();
  const [, setToLocalStorage, clear] = AppHooks.useLocalStorage();
  const [error, setError] = React.useState(false);

  const login = (value: { password: string; username: string }) => {
    setError(false);
    const { username, password } = value;
    axios &&
      axios
        .post(ApiRoutes.LOGIN, { username, password })
        .then(({ data }: AxiosResponse<AuthToken>) => {
          setToLocalStorage(APP_CONSTANTS.LOCAL_STORAGE.TOKEN, data);
          navigate(AppRoutes.PAGES);
        })
        .catch(() => {
          setError(true);
        });
  };

  const logout = () => {
    setError(false);
    axios &&
      axios
        .post(ApiRoutes.LOGOUT)
        .then(() => {
          clear();
          navigate(AppRoutes.LOGIN);
        })
        .catch((err: AxiosError) => {
          setError(true);
        });
  };
  return { login, logout, loading, error };
};
