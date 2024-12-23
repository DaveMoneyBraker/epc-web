import React from "react";
import { RouterProvider } from "react-router-dom";
import { useAppRouter } from "./core/router";

export const App: React.FC = () => {
  const appRouter = useAppRouter();

  return <RouterProvider router={appRouter} />;
};
