import {
  TitleValueObject,
  UiConfig,
  UiDataGridDensity,
  UiDataGridDensityMap,
  UiElementSize,
  UiElementSizeMap,
  UiFontSize,
  UiFontSizeMap,
} from "../types";

export const UI_ELEMENT_SIZE: UiElementSizeMap = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};

export const UI_ELEMENT_SIZE_OPTIONS: TitleValueObject<UiElementSize>[] = [
  { title: UI_ELEMENT_SIZE.SMALL, value: UI_ELEMENT_SIZE.SMALL },
  { title: UI_ELEMENT_SIZE.MEDIUM, value: UI_ELEMENT_SIZE.MEDIUM },
  { title: UI_ELEMENT_SIZE.LARGE, value: UI_ELEMENT_SIZE.LARGE },
];

export const UI_FONT_SIZE: UiFontSizeMap = {
  SMALL: 13,
  MEDIUM: 16,
  LARGE: 20,
};

export const UI_FONT_SIZE_OPTIONS: TitleValueObject<UiFontSize>[] = [
  { title: UI_ELEMENT_SIZE.SMALL, value: UI_FONT_SIZE.SMALL },
  { title: UI_ELEMENT_SIZE.MEDIUM, value: UI_FONT_SIZE.MEDIUM },
  { title: UI_ELEMENT_SIZE.LARGE, value: UI_FONT_SIZE.LARGE },
];

export const UI_TABLE_DENSITY: UiDataGridDensityMap = {
  COMPACT: "compact",
  STANDARD: "standard",
  COMFORTABLE: "comfortable",
};

export const UI_TABLE_DENSITY_OPTIONS: TitleValueObject<UiDataGridDensity>[] = [
  { title: UI_TABLE_DENSITY.COMPACT, value: UI_TABLE_DENSITY.COMPACT },
  { title: UI_TABLE_DENSITY.STANDARD, value: UI_TABLE_DENSITY.STANDARD },
  { title: UI_TABLE_DENSITY.COMFORTABLE, value: UI_TABLE_DENSITY.COMFORTABLE },
];

export const DEFAULT_UI_CONFIG: UiConfig = {
  buttonSize: UI_ELEMENT_SIZE.SMALL,
  iconFontSize: UI_FONT_SIZE.SMALL,
  tableDensity: UI_TABLE_DENSITY.COMPACT,
  tableFontSize: UI_FONT_SIZE.SMALL,
};
