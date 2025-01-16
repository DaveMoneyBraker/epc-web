import { AxiosResponse } from "axios";
import APP_CONSTANTS from "../../constants/AppConstants";

export const validateAxiosResponse = <T = any>(
  response: AxiosResponse,
  validators: ((response: AxiosResponse<T>) => string)[] = []
): string | null => {
  if (!response) {
    return APP_CONSTANTS.APP_ERRORS.NO_SERVER_RESPONSE;
  }

  if (!response.data) {
    return APP_CONSTANTS.APP_ERRORS.INVALID_SERVER_RESPONSE;
  }

  let validatorsError = "";
  validators.forEach((validator) => (validatorsError += validator(response)));

  return validatorsError || null;
};
