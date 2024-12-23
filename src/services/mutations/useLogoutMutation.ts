import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAxiosContext } from "../../providers/axios";
import AppHooks from "../../hooks/0_AppHooks";
import { ApiRoutes, AppRoutes } from "../../core/router";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const { axios, loading } = useAxiosContext();
  const [, , clear] = AppHooks.useLocalStorage();

  const mutationFn = React.useCallback(async () => {
    const res = await axios?.post(ApiRoutes.LOGOUT);
    clear();
    navigate(AppRoutes.LOGIN);
    return res;
  }, [axios, navigate, clear]);

  const mutation = useMutation({ mutationFn });
  return { mutation, loading };
};
