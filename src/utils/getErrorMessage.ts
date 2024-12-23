import { AxiosError } from "axios";
import { isNull } from "./checks";

export interface AppError {
  code: number;
  message: string;
  params: {
    property: string;
    message: string[];
  }[];
}

export const getErrorMessage = (err: AxiosError) => {
  try {
    if (typeof err === "string") {
      return err;
    }
    const {
      response: { data },
    } = err as unknown as { response: { data: AppError } };
    const { message, params } = data;

    if (isNull(params)) {
      return message;
    }
    if (!params) {
      return message ? message : err.message;
    }
    if (params.length && params.length === 0) {
      return message;
    }
    let errorMessage = "";
    params.forEach((er) => {
      let paramsErrorMessage = "";
      er.message.forEach((message) => (paramsErrorMessage += message + ". "));
      errorMessage += paramsErrorMessage;
    });
    return errorMessage;
  } catch (err) {
    console.log({ err });
    return "Sorry, an error has occurred";
  }
};
