import { useNavigate } from "react-router-dom";
import React from "react";
import { TOKEN } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { useAxiosContext } from "../../providers/axios";
import AppHooks from "../../hooks/0_AppHooks";
import { ApiRoutes, AppRoutes } from "../../core/router";

export const useLoginMutation = (username: string, password: string) => {
  const navigate = useNavigate();
  const { axios, loading } = useAxiosContext();
  const [, setToLocalStorage] = AppHooks.useLocalStorage();

  const mutationFn = React.useCallback(async () => {
    const res = await axios?.post(ApiRoutes.LOGIN, { username, password });
    if (res) {
      const { data } = res;
      setToLocalStorage(TOKEN, data);
      navigate(AppRoutes.SUPPRESSION_DOMAIN);
      return data;
    } else throw new Error("Login Error");
  }, [username, password, axios, navigate, setToLocalStorage]);

  const mutation = useMutation({ mutationFn });

  return { mutation, loading };
};
