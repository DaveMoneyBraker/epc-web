import { FileMapperPreview, FileMapperPreviewColumn } from "../../../../types";
import * as Papa from "papaparse";

export const getMappedFilesString = (
  previews: FileMapperPreview[],
  files: File[]
): string => {
  const unskippedPreviews = previews.filter((preview) => !preview.skip);
  previews.forEach(({ skip, columns, filename }, i) => {
    console.log({ files });
    console.log({ filename });
    const fileIndex = files.findIndex((f) => f.name === filename);
    console.log({ fileIndex });
  });
  // mappedFiles.forEach((file) =>
  //   Papa.parse<any, File>(file, {
  //     header: false,
  //     complete: (result) => {
  //       console.log({ result });
  //     },
  //   })
  // );
  return "";
};
