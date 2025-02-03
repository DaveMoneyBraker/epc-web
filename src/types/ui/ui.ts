import { GridDensity } from "@mui/x-data-grid";

export type UiElementSize = "small" | "medium" | "large";
export type UiFontSize = 13 | 16 | 20;
export type UiIconFontSize = 22 | 26 | 30;
export type UiInputSize = "small" | "medium";

export type UiElementSizeMap = {
  [K in Uppercase<UiElementSize>]: Lowercase<UiElementSize>;
};

export type UiInputSizeMap = {
  [K in Uppercase<UiInputSize>]: Lowercase<UiInputSize>;
};

export type UiFontSizeMap = {
  [K in Uppercase<UiElementSize>]: UiFontSize;
};

export type UiIconFontSizeMap = {
  [K in Uppercase<UiElementSize>]: UiIconFontSize;
};

export type UiDataGridDensity = GridDensity;
export type UiDataGridDensityMap = {
  [K in Uppercase<UiDataGridDensity>]: Lowercase<UiDataGridDensity>;
};

export type UiDataGridFontSizeMap = {
  [K in Uppercase<UiDataGridDensity>]: UiFontSize;
};

export interface UiConfig {
  buttonSize: UiElementSize;
  iconFontSize: UiIconFontSize;
  tableDensity: UiDataGridDensity;
  tableFontSize: UiFontSize;
  inputSize: UiInputSize;
}
