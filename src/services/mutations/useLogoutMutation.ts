import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import APP_HOOKS from "../../hooks/0_AppHooks";
import APP_CONSTANTS from "../../constants/0_AppConstants";
import CONTEXT_HOOKS from "../../providers/0_ContextHooks";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const { axios, loading } = CONTEXT_HOOKS.useAxiosContext();
  const { clear } = APP_HOOKS.useLocalStorage();
  const axiosResponseValidator = APP_HOOKS.useAxiosResponseValidator();

  const mutationFn = React.useCallback(async () => {
    if (!axios) {
      throw new Error(APP_CONSTANTS.APP_ERRORS.NO_AXIOS_INSTANCE);
    }
    try {
      const response = await axios?.post(APP_CONSTANTS.API_ROUTES.LOGOUT);
      const errorMessage = axiosResponseValidator(response);

      if (errorMessage) {
        throw new Error(errorMessage);
      }

      clear();
      navigate(APP_CONSTANTS.APP_ROUTES.LOGIN);
      return response;
    } catch (error) {
      console.error("useLogoutMutation query error:", error);
      navigate(APP_CONSTANTS.APP_ROUTES.LOGIN);
      throw error;
    }
  }, [axios, axiosResponseValidator, clear, navigate]);

  const mutation = useMutation({ mutationFn });
  return { mutation, loading };
};
