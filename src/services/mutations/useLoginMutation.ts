import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AppHooks from "../../hooks/0_AppHooks";
import APP_CONSTANTS from "../../constants/AppConstants";
import ContextHooks from "../../providers/0_ContextHooks";

export const useLoginMutation = (username: string, password: string) => {
  const navigate = useNavigate();
  const { axios, loading } = ContextHooks.useAxiosContext();
  const { set } = AppHooks.useLocalStorage();
  const axiosResponseValidator = AppHooks.useAxiosResponseValidator();

  const mutationFn = React.useCallback(async () => {
    if (!axios) {
      throw new Error(APP_CONSTANTS.APP_ERRORS.NO_AXIOS_INSTANCE);
    }

    try {
      const response = await axios?.post(APP_CONSTANTS.API_ROUTES.LOGIN, {
        username,
        password,
      });
      const errorMessage = axiosResponseValidator(response);

      if (errorMessage) {
        throw new Error(errorMessage);
      }

      const { data } = response;
      set(APP_CONSTANTS.LOCAL_STORAGE.TOKEN, data);
      navigate(APP_CONSTANTS.APP_ROUTES.SUPPRESSION_DOMAIN);
      return data;
    } catch (error) {
      console.error("useLoginMutation query error:", error);
      throw error;
    }
  }, [axios, username, password, axiosResponseValidator, set, navigate]);

  const mutation = useMutation({ mutationFn });

  return { mutation, loading };
};
