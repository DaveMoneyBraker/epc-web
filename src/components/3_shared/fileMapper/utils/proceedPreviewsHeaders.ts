import { FileMapperPreview } from "../../../../types";

export const proceedPreviewsHeaders = (
  previews: FileMapperPreview[],
  availableHeaders: string[]
): FileMapperPreview[] =>
  previews.map((preview) => {
    const proceededHeaders: string[] = [];
    const newColumns = preview.columns.map((col) => {
      const { header } = col;
      // IF WE DON'T PROCEED HEADERS WITH THE SAME NAME
      // AND THERE IS MATCH BETWEEN AVAILABLE_HEADERS AND OUR HEADER
      // UPDATE HEADER
      // ELSE - RESET HEADER
      let newHeader = "";
      if (
        !proceededHeaders.some((v) => v === header) &&
        availableHeaders.some(
          (v) => v.toLocaleLowerCase() === header.toLocaleLowerCase()
        )
      ) {
        newHeader = header.toLocaleLowerCase();
      }

      proceededHeaders.push(header);
      return { ...col, header: newHeader };
    });
    return {
      ...preview,
      columns: newColumns,
      containHeaders: newColumns.every(({ header }) => header),
    };
  });
