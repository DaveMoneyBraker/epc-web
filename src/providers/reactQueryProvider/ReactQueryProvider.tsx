import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChildrenProps } from "../../types";

export const ReactQueryProvider: React.FC<ChildrenProps> = ({ children }) => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};
