import {
  Components,
  CssVarsTheme,
  Theme,
  useTheme,
} from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import React from "react";

// UPDATING THEME TYPOGRAPHY
declare module "@mui/material/styles" {
  interface TypographyVariants {
    inputError?: React.CSSProperties;
    category?: React.CSSProperties;
    body3?: React.CSSProperties;
    warning?: React.CSSProperties;
    queueStats?: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    inputError?: React.CSSProperties;
    category?: React.CSSProperties;
    body3?: React.CSSProperties;
    warning?: React.CSSProperties;
    queueStats?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    inputError: true;
    category: true;
    body3: true;
    warning: true;
    queueStats: true;
  }
}

export const useAppMuiTypography = (): TypographyOptions => {
  const theme = useTheme();
  return {
    h2: {
      fontSize: "48px",
      fontWeight: 800,
    },
    h3: {
      fontSize: "40px",
      fontWeight: 800,
      lineHeight: "48.41px",
    },
    h5: {
      fontSize: "26px",
      fontWeight: 700,
      lineHeight: "31.47px",
    },
    h6: {
      fontSize: "24px",
      fontWeight: 500,
      color: "#5A5A5A",
    },
    body2: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "19px",
    },
    // CUSTOM VARIANTS
    body3: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "19px",
    },
    warning: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "19px",
      color: theme.palette.warning.light,
    },
    inputError: {
      fontSize: "10px",
      fontWeight: 500,
      lineHeight: "17px",
      letterSpacing: "0rem",
      color: theme.palette.error.light,
    },
    category: {
      fontSize: "15px",
      fontWeight: 600,
      lineHeight: "17px",
      letterSpacing: "0rem",
      color: "#000000",
    },
    queueStats: {
      fontSize: "14px",
      fontWeight: "bold",
      lineHeight: "12px",
      color: "#757575",
    },
  };
};

export const useAppMuiComponents = (): Components<
  Omit<Theme, "components" | "palette"> & CssVarsTheme
> => {
  return {
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: "70px",
        },
      },
    },
  };
};
