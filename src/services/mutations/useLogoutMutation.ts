import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAxiosContext } from "../../providers/axios";
import AppHooks from "../../hooks/0_AppHooks";
import { ApiRoutes, AppRoutes } from "../../core/router";
import APP_CONSTANTS from "../../constants/AppConstants";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const { axios, loading } = useAxiosContext();
  const [, , clear] = AppHooks.useLocalStorage();
  const axiosResponseValidator = AppHooks.useAxiosResponseValidator();

  const mutationFn = React.useCallback(async () => {
    if (!axios) {
      throw new Error(APP_CONSTANTS.APP_ERRORS.NO_AXIOS_INSTANCE);
    }
    try {
      const response = await axios?.post(ApiRoutes.LOGOUT);
      const errorMessage = axiosResponseValidator(response);

      if (errorMessage) {
        throw new Error(errorMessage);
      }

      clear();
      navigate(AppRoutes.LOGIN);
      return response;
    } catch (error) {
      console.error("useLogoutMutation query error:", error);
      navigate(AppRoutes.LOGIN);
      throw error;
    }
  }, [axios, navigate, clear]);

  const mutation = useMutation({ mutationFn });
  return { mutation, loading };
};
