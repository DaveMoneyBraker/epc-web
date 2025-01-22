import React from "react";
import { Link, Paper, styled, Typography } from "@mui/material";
import { PageInfo } from "./types";
import AppHooks from "../../hooks/0_AppHooks";

const Wrapper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  height: "300px", // Fixed height as requested
  width: "100%",
  color: theme.palette.text.secondary,
  ...theme.typography.body2,
}));

// Scrollable content container
const ScrollableContent = styled("div")({
  flex: 1,
  width: "100%",
  overflowY: "auto",
  marginBottom: "8px",
});

interface Props {
  pageInfo: PageInfo;
}

export const InfoCard: React.FC<Props> = ({ pageInfo }) => {
  const { title, description, appRoute, permissions } = pageInfo;
  const isAdmin = AppHooks.useIsAdmin();
  const permissionsString = React.useMemo(
    () => permissions.join(", "),
    [permissions]
  );
  return (
    <Wrapper elevation={8}>
      <Typography variant="h6" component="h2" sx={{ width: "100%" }}>
        <Link href={appRoute}>{title}</Link>
      </Typography>
      <ScrollableContent>
        <Typography variant="body2" sx={{ textAlign: "left" }}>
          {description}
        </Typography>
      </ScrollableContent>
      {isAdmin && (
        <Typography
          variant="caption"
          sx={{
            width: "100%",
            textAlign: "left",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Required permissions: {permissionsString}
        </Typography>
      )}
    </Wrapper>
  );
};
