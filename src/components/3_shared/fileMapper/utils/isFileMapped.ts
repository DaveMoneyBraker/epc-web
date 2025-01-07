import { FileMapperPreview } from "../../../../types";

export const isFileMapped = (
  preview: FileMapperPreview,
  requiredHeaderPairs: string[][]
): boolean => {
  const { columns, skip } = preview;
  // SKIPPED FILE === MAPPED FILE
  if (skip) {
    return true;
  }
  // EACH COLUMN SKIPPED === FILE SKIPPED === FILE MAPPED
  if (columns.every(({ skip: colSkip }) => colSkip)) {
    return true;
  }
  // IF AT LEAST ON COLUMN DON'T HAVE HEADER & NOT SKIPPED - FILE NOT MAPPED
  if (columns.some(({ header, skip: colSkip }) => !header && !colSkip)) {
    return false;
  }

  const columnHeaders: string[] = [];
  columns.forEach(
    ({ header, skip }) => !skip && header && columnHeaders.push(header)
  );
  return requiredHeaderPairs.every((requiredHeaderPair) =>
    requiredHeaderPair.some((requiredHeader) =>
      columnHeaders.some((header) => header === requiredHeader)
    )
  );
};
