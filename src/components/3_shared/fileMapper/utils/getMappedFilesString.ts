import { FileMapperPreview, FileMapperPreviewColumn } from "../../../../types";
import * as Papa from "papaparse";

export const getMappedFilesString = (
  previews: FileMapperPreview[],
  files: File[]
): string => {
  const columns: FileMapperPreviewColumn[] = [];
  const mappedFiles: File[] = [];
  previews.forEach(({ skip, columns: previewColumns }, i) => {
    if (!skip) {
      mappedFiles.push(files[i]);
      previewColumns.forEach((column) => !column.skip && columns.push(column));
    }
  });
  mappedFiles.forEach((file) =>
    Papa.parse<any, File>(file, {
      header: false,
      complete: (result) => {
        console.log({ result });
      },
    })
  );
  return "";
};
