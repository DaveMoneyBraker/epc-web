import { AxiosResponse } from "axios";
import { PaginationResponse } from "../../types";

export const validatePaginationResponse = <T = any>(
  response: AxiosResponse<PaginationResponse<T>>
): string => {
  type ValidationSchema = {
    [K in "items" | "totalItems"]: (value: unknown) => boolean;
  };

  const schema: ValidationSchema = {
    items: (items: unknown): items is T[] => Array.isArray(items),
    totalItems: (total: unknown): total is number =>
      typeof total === "number" && total >= 0,
  };

  return (Object.keys(schema) as Array<keyof ValidationSchema>).reduce(
    (error, key) => {
      let newErr = "";
      if (!schema[key](response.data[key])) {
        newErr = `Invalid ${key}. `;
      }
      return error + newErr;
    },
    ""
  );
};
