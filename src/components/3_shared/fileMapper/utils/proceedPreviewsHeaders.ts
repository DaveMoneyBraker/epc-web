import APP_CHECKS from "../../../../checks";
import { FileMapperPreview } from "../../../../types";

export const proceedPreviewsHeaders = (
  previews: FileMapperPreview[],
  availableHeaders: string[]
): FileMapperPreview[] => {
  return previews.map((preview) => {
    let headersLeft = [...availableHeaders];
    const newColumns = preview.columns.map((col) => {
      const { header, data } = col;
      const lowerCaseHeader = header.toLowerCase();
      let newHeader = proceedHeader(
        lowerCaseHeader,
        availableHeaders,
        headersLeft
      );
      // IF NO HEADER FOUND
      // TRY AGAIN WITH SECOND ROW
      if (!newHeader) {
        const secondRowHeader = data[1].toLowerCase() || "";
        newHeader = proceedHeader(
          secondRowHeader,
          availableHeaders,
          headersLeft
        );
      }

      headersLeft = headersLeft.filter((hl) => hl !== newHeader);
      return { ...col, header: newHeader };
    });
    return {
      ...preview,
      columns: newColumns,
      containHeaders: newColumns.every(({ header }) => header),
    };
  });
};

const proceedHeader = (
  header: string,
  availableHeaders: string[],
  headersLeft: string[]
): string => {
  let newHeader = "";

  // IF EMAIL OPTION IS AVAILABLE
  // CHECK FOR EMAIL
  if (
    availableHeaders.includes("email") &&
    headersLeft.includes("email") &&
    (APP_CHECKS.isEmail(header) || header === "email")
  ) {
    newHeader = "email";
  }

  // IF DOMAIN OPTION IS AVAILABLE
  // CHECK FOR DOMAIN
  if (
    availableHeaders.includes("domain") &&
    headersLeft.includes("domain") &&
    (APP_CHECKS.isDomain(header) || header === "domain")
  ) {
    newHeader = "domain";
  }

  // IF MX OPTION IS AVAILABLE
  // CHECK FOR DOMAIN
  if (
    availableHeaders.includes("mx") &&
    headersLeft.includes("mx") &&
    (APP_CHECKS.isDomain(header) || header === "mx")
  ) {
    newHeader = "mx";
  }

  // IF ADDRESS OPTION IS AVAILABLE
  // CHECK FOR DOMAIN OR IP
  if (
    availableHeaders.includes("address") &&
    headersLeft.includes("address") &&
    (header === "address" ||
      APP_CHECKS.isDomain(header) ||
      APP_CHECKS.isIp(header))
  ) {
    newHeader = "address";
  }

  // IF THERE IS MATCH BETWEEN AVAILABLE_HEADERS AND OUR HEADER
  // AND IF WE DON'T PROCEED HEADER WITH THE SAME NAME
  // UPDATE HEADER
  if (
    availableHeaders.some((v) => v.toLocaleLowerCase() === header) &&
    headersLeft.some((v) => v === header)
  ) {
    newHeader = header;
  }

  return newHeader;
};
