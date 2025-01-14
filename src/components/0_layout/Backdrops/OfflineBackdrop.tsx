import React from "react";
import { Backdrop, Box, LinearProgress, Typography } from "@mui/material";

interface Props {
  online: boolean;
}

export const OfflineBackdrop: React.FC<Props> = ({ online }) => (
  <Backdrop
    sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
    open={!online}
  >
    {/* <Box sx={{ width: "100%" }}>
      <LinearProgress />
      <Typography variant="body2">hello</Typography>
    </Box> */}
    <Box
      sx={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        gap: "50px",
      }}
    >
      <LinearProgress color="primary" sx={{ width: "100%" }} />
      <Typography variant="h5">No Internet Connection :(</Typography>
    </Box>
  </Backdrop>
);
