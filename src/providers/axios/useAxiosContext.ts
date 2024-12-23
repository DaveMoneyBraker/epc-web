import React from "react";
import { AxiosContext } from "./AxiosContext";

export const useAxiosContext = () => {
  const value = React.useContext(AxiosContext);
  if (!value) {
    throw new Error("useAxiosContext used outside of AxiosContext");
  }
  return value;
};
