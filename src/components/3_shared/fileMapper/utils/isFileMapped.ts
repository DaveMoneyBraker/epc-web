import { FileMapperPreview } from "../../../../types";

export const isFileMapped = (
  preview: FileMapperPreview,
  requiredHeaders: string[][]
): boolean => {
  const { columns, skip } = preview;
  if (skip) {
    return true;
  }
  if (columns.some(({ header, skip: colSkip }) => !header && colSkip)) {
    return false;
  }
  if (columns.every(({ skip: colSkip }) => colSkip)) {
    return true;
  }
  return false;
};
