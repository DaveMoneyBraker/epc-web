import { AxiosResponse } from "axios";

export type ResponseValidator<T> = (response: AxiosResponse<T>) => string;

export type ValidationError = string | null;

export type ValidationHookResult<T> = (
  response: AxiosResponse<T> | null,
  validators?: ResponseValidator<T>[]
) => ValidationError;
