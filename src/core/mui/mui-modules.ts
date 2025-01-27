import {
  BreakpointsOptions,
  Components,
  CssVarsTheme,
  Theme,
} from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import React from "react";
import AppHooks from "../../hooks/0_AppHooks";

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

  // Extend the default breakpoints
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    // custom breakpoints
    iphone: true;
    ipadMini: true;
    ipadPro: true;
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

  // interface BreakpointOverrides {
  //   iphone: true;
  //   ipadMini: true;
  //   ipadPro: true;
  // }
}

export const useAppMuiTypography = () => {
  const {
    grey,
    warning: { light: warningLight },
    error: { light: errorLight },
  } = AppHooks.useThemePalette();
  return React.useMemo<TypographyOptions>(
    () => ({
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 14,
      h1: {
        // EXAMPLE
        // fontFamily: "'DM Serif Text', serif",
        // fontStyle: "italic",
      },
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
        color: grey[500],
      },
      body1: {
        // EXAMPLE
        // fontFamily: "'DM Sans', sens-serif",
        fontSize: "1rem",
      },
      body2: {
        // fontFamily: "'DM Sans', sens-serif",
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
        color: warningLight,
      },
      inputError: {
        fontSize: "10px",
        fontWeight: 500,
        lineHeight: "17px",
        letterSpacing: "0rem",
        color: errorLight,
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
    }),
    [errorLight, grey, warningLight]
  );
};

export const useAppMuiBreakpoints = () =>
  React.useMemo<BreakpointsOptions>(
    () => ({
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
        // Common iOS device breakpoints
        iphone: 390,
        ipadMini: 768,
        ipadPro: 1024,
      },
    }),
    []
  );

export const useAppMuiComponents = () =>
  React.useMemo<
    Components<Omit<Theme, "components" | "palette"> & CssVarsTheme>
  >(
    () => ({
      MuiCssBaseline: {
        styleOverrides: `
      @supports (-webkit-touch-callout: none) {
        body {
          overscroll-behavior-y: none;
          -webkit-font-smoothing: antialiased;
          -webkit-text-size-adjust: 100%;
        }
      }
    `,
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            height: "70px",
          },
        },
      },
    }),
    []
  );
