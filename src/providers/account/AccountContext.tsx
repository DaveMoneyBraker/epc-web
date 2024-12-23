import React from "react";
import { AccountData } from "../../types";

export const AccountContext = React.createContext<AccountData | null>(null);
