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
      let completedFiles = 0;
      files.forEach((file) =>
        Papa.parse<any, File>(file, {
          preview: 4,
          skipEmptyLines: true,
          complete: (result) => {
            data.push({ data: result.data, filename: file.name });
            const filename = file.name;
            console.log("papaparse: ", { filename });
            completedFiles++;
            if (completedFiles === files.length) {
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
