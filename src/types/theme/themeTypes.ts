import { Theme } from "@mui/material";

export type ThemeMode = "light" | "dark";

export type ThemeModeMap = {
  [K in Uppercase<ThemeMode>]: Lowercase<K>;
};

export type ThemeModeValue = {
  [K in ThemeMode]: Theme;
};
