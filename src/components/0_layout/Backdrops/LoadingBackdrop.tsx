import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

interface Props {
  loading: boolean;
}

export const LoadingBackdrop: React.FC<Props> = ({ loading }) => (
  <Backdrop
    sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
    open={loading}
  >
    <CircularProgress />
  </Backdrop>
);
