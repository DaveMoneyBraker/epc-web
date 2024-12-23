import React from "react";
import { AxiosInstance } from "axios";

export const AxiosContext = React.createContext<{
  axios: AxiosInstance | null;
  loading: boolean;
}>({ axios: null, loading: false });
