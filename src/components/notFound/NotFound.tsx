import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EnhancedButton } from "../1_enhanced";
import APP_CONSTANTS from "../../constants/AppConstants";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = React.useCallback(() => {
    navigate(APP_CONSTANTS.APP_ROUTES.PAGES);
  }, [navigate]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "var(--content-height)",
          textAlign: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: "6rem", sm: "8rem" },
            fontWeight: "bold",
            color: "primary.main",
            mb: 2,
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 2,
            fontWeight: "medium",
          }}
        >
          Page Not Found
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>

        <EnhancedButton
          size="large"
          onClick={handleGoHome}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
          }}
        >
          Return Home
        </EnhancedButton>
      </Box>
    </Container>
  );
};

export default NotFound;
