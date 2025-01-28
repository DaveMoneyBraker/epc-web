import React from "react";
import { AccountContext } from "./AccountContext";
import { AccountData } from "../../types";

export type UseAccountContext = () => AccountData;

export const useAccountContext: UseAccountContext = () => {
  const value = React.useContext(AccountContext);
  if (!value) {
    throw new Error("useAccountContext used outside of AccountContext");
  }
  return value;
};
