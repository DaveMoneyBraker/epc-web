import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { InfoCard } from "./InfoCard";
import AppHooks from "../../hooks/0_AppHooks";

export const Info: React.FC = () => {
  const pagesInfo = AppHooks.useCleanedPagesInfo();
  return (
    <Box sx={{ flexGrow: 1, padding: "15px" }}>
      <Grid container spacing={2}>
        {pagesInfo.map((pageInfo, index) => (
          <Grid size={4} key={`${pageInfo.appRoute}-${index}`}>
            <InfoCard pageInfo={pageInfo} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
