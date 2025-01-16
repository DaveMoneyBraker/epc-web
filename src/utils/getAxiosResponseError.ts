import { AxiosResponse } from "axios";
import APP_CONSTANTS from "../constants/AppConstants";

export const getAxiosResponseError = (
  response: AxiosResponse,
  keyToCheck: string[] = []
): string | null => {
  if (!response) {
    return APP_CONSTANTS.APP_ERRORS.NO_SERVER_RESPONSE;
  }

  if (!response.data) {
    return APP_CONSTANTS.APP_ERRORS.INVALID_SERVER_RESPONSE;
  }

  if (keyToCheck.some((key) => !response.data[key])) {
    return APP_CONSTANTS.APP_ERRORS.INVALID_ITEMS_FORMAT;
  }

  return null;
};
