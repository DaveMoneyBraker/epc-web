import React from "react";
import { AxiosError, AxiosResponse } from "axios";
import { AuthToken, TOKEN } from "../types";
import { useNavigate } from "react-router-dom";
import { ApiRoutes, AppRoutes } from "../core/router";
import AppHooks from "./0_AppHooks";
import { useAxiosContext } from "../providers/axios";

interface I {
  login: (value: { password: string; username: string }) => void;
  logout: () => void;
  loading: boolean;
  error: any;
}

export const useAuth = (): I => {
  const navigate = useNavigate();
  const { axios, loading } = useAxiosContext();
  const [, setToLocalStorage, clear] = AppHooks.useLocalStorage();
  const [error, setError] = React.useState(false);

  const login = (value: { password: string; username: string }) => {
    setError(false);
    const { username, password } = value;
    axios &&
      axios
        .post(ApiRoutes.LOGIN, { username, password })
        .then(({ data }: AxiosResponse<AuthToken>) => {
          setToLocalStorage(TOKEN, data);
          navigate(AppRoutes.SUPPRESSION_EMAIL);
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
