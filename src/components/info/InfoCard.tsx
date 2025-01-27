import React from "react";
import { Paper, styled, Typography } from "@mui/material";
import APP_HOOKS from "../../hooks/0_AppHooks";
import { EnhancedLink } from "../1_enhanced";
import { PageInfo } from "../../types";

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
  const isAdmin = APP_HOOKS.useIsAdmin();
  const permissionsString = React.useMemo(
    () => permissions.join(", "),
    [permissions]
  );
  return (
    <Wrapper elevation={8}>
      <EnhancedLink to={appRoute} sx={{ width: "100%" }}>
        <Typography variant="h5">{title}</Typography>
      </EnhancedLink>
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
