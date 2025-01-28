import React from "react";
import { AxiosContext, AxiosContextValue } from "./AxiosContext";

export type UseAxiosContext = () => AxiosContextValue;

export const useAxiosContext: UseAxiosContext = () => {
  const value = React.useContext(AxiosContext);
  if (!value) {
    throw new Error("useAxiosContext used outside of AxiosContext");
  }
  return value;
};
