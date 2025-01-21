import { useNavigate } from "react-router-dom";
import React from "react";
import { TOKEN } from "../../types";
import { useMutation } from "@tanstack/react-query";
import AppHooks from "../../hooks/0_AppHooks";
import { ApiRoutes, AppRoutes } from "../../core/router";
import APP_CONSTANTS from "../../constants/AppConstants";
import ContextHooks from "../../providers/0_ContextHooks";

export const useLoginMutation = (username: string, password: string) => {
  const navigate = useNavigate();
  const { axios, loading } = ContextHooks.useAxiosContext();
  const [, setToLocalStorage] = AppHooks.useLocalStorage();
  const axiosResponseValidator = AppHooks.useAxiosResponseValidator();

  const mutationFn = React.useCallback(async () => {
    if (!axios) {
      throw new Error(APP_CONSTANTS.APP_ERRORS.NO_AXIOS_INSTANCE);
    }

    try {
      const response = await axios?.post(ApiRoutes.LOGIN, {
        username,
        password,
      });
      const errorMessage = axiosResponseValidator(response);

      if (errorMessage) {
        throw new Error(errorMessage);
      }

      const { data } = response;
      setToLocalStorage(TOKEN, data);
      navigate(AppRoutes.SUPPRESSION_DOMAIN);
      return data;
    } catch (error) {
      console.error("useLoginMutation query error:", error);
      throw error;
    }
  }, [
    username,
    password,
    axios,
    navigate,
    setToLocalStorage,
    axiosResponseValidator,
  ]);

  const mutation = useMutation({ mutationFn });

  return { mutation, loading };
};
