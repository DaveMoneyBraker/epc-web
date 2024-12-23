import React from "react";
import { AccountContext } from "./AccountContext";

export const useAccountContext = () => {
  const value = React.useContext(AccountContext);
  if (!value) {
    throw new Error("useAccountContext used outside of AccountContext");
  }
  return value;
};
