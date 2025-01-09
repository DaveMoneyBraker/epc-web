import React from "react";
import * as Papa from "papaparse";
import { PapaparseRawData } from "../../../../types";

export const useFileParser = (): {
  parsing: boolean;
  parse: (files: File[], setter: (data: PapaparseRawData[]) => void) => void;
} => {
  const [parsing, setParsing] = React.useState(false);

  const parse = React.useCallback(
    (files: File[], setter: (data: PapaparseRawData[]) => void) => {
      setParsing(true);
      const data: PapaparseRawData[] = [];
      files.forEach((file, i) =>
        Papa.parse<any, File>(file, {
          preview: 4,
          skipEmptyLines: true,
          complete: (result) => {
            data.push({ data: result.data, filename: file.name });
            if (i + 1 === files.length) {
              setParsing(false);
              setTimeout(() => setter(data), 0);
            }
            return data;
          },
        })
      );
    },
    []
  );

  return { parsing, parse };
};
