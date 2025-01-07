import { FileMapperPreview } from "../../../../types";
import { proceedPreviewsHeaders } from "./proceedPreviewsHeaders";

export const getFilesPreview = (
  data: string[][][],
  filename: string,
  availableHeaders: string[]
): FileMapperPreview[] => {
  if (!data.length) {
    return [];
  }
  const previews: FileMapperPreview[] = [];
  data.forEach((v) => {
    const length = v[0].length;
    const cols: string[][] = [];
    for (let i = 0; i < length; i++) {
      cols.push([]);
      v.forEach((row) => {
        cols[i].push(row[i]);
      });
    }
    const preview: FileMapperPreview = {
      skip: false,
      columns: [],
      filename,
      containHeaders: false,
    };
    for (let i = 0; i < length; i++) {
      const col = cols[i];
      preview.columns.push({
        header: col[0] || "no data",
        data: col,
        skip: false,
      });
    }
    previews.push(preview);
  });
  return proceedPreviewsHeaders(previews, availableHeaders);
};
