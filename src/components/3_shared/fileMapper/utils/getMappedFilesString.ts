import { FileMapperPreview } from "../../../../types";
import * as Papa from "papaparse";

export const getMappedFilesString = (
  previews: FileMapperPreview[],
  files: File[],
  onComplete: (value: string) => void
): string => {
  const unSkippedPreviews = previews.filter((preview) => !preview.skip);
  let fileString = "";
  let mappedHeaders: string[] = [];
  unSkippedPreviews.forEach((p) =>
    p.columns.forEach(
      (column) => !column.skip && mappedHeaders.push(column.header)
    )
  );
  mappedHeaders = mappedHeaders.filter(function (item, pos) {
    return mappedHeaders.indexOf(item) === pos;
  });
  fileString += `${mappedHeaders.join(",")}\n`;
  unSkippedPreviews.forEach(
    ({ filename, columns, containHeaders }, previewIndex) => {
      const file = files.find(({ name }) => name === filename);
      if (file) {
        Papa.parse<any, File>(file, {
          header: false,
          fastMode: true,
          skipEmptyLines: "greedy",
          complete: ({ data }) => {
            data.forEach((row: string[], rowI) => {
              if (rowI === 0 && containHeaders) {
                return;
              }
              const sortedRow = new Array(mappedHeaders.length).fill("");
              row.forEach((columnValue, i) => {
                const relatedPreviewColumn = columns[i];
                if (relatedPreviewColumn.skip) {
                  return;
                }
                const columnIndex = mappedHeaders.indexOf(
                  relatedPreviewColumn.header
                );
                sortedRow[columnIndex] = columnValue;
              });
              fileString += `${sortedRow.join(",")}\n`;
            });
            if (previewIndex + 1 === unSkippedPreviews.length) {
              setTimeout(() => onComplete(fileString), 0);
            }
          },
        });
      }
    }
  );
  return fileString;
};
