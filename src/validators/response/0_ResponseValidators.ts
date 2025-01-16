import { validatePaginationResponse } from "./validatePaginationResponse";
import { validateAxiosResponse } from "./validateAxiosResponse";

const AppResponseValidators = {
  validatePaginationResponse,
  validateAxiosResponse,
} as const;

export default AppResponseValidators;
