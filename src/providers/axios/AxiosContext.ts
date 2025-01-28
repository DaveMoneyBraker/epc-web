import React from "react";
import { AxiosInstance } from "axios";

export interface AxiosContextValue {
  axios: AxiosInstance | null;
  loading: boolean;
}

export const AxiosContext = React.createContext<AxiosContextValue>({
  axios: null,
  loading: false,
});
