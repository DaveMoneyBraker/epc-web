import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

interface Props {
  loading: boolean;
}

export const LoadingBackdrop: React.FC<Props> = ({ loading }) => (
  <Backdrop
    sx={(theme) => ({
      color: "#fff",
      zIndex: 100,
      height: "var(--content-height)",
      marginTop: "70px",
    })}
    open={loading}
  >
    <CircularProgress />
  </Backdrop>
);
