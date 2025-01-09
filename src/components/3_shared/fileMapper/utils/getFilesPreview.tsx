import { FileMapperPreview, PapaparseRawData } from "../../../../types";
import { proceedPreviewsHeaders } from "./proceedPreviewsHeaders";

export const getFilesPreview = (
  rawData: PapaparseRawData[],
  availableHeaders: string[]
): FileMapperPreview[] => {
  if (!rawData.length) {
    return [];
  }
  const previews: FileMapperPreview[] = [];
  rawData.forEach((v) => {
    const { data, filename } = v;
    const length = data[0].length;
    const cols: string[][] = [];
    for (let i = 0; i < length; i++) {
      cols.push([]);
      data.forEach((row) => {
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
