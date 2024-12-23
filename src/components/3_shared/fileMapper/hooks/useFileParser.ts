import React from "react";
import * as Papa from "papaparse";

export const useFileParser = (): {
  parsing: boolean;
  parse: (
    files: File[],
    setter: (v: string[][][], filename: string) => void
  ) => void;
} => {
  const [parsing, setParsing] = React.useState(false);

  const parse = React.useCallback(
    (files: File[], setter: (v: string[][][], filename: string) => void) => {
      setParsing(true);
      const data: string[][][] = [];
      files.forEach((file, i) =>
        Papa.parse<any, File>(file, {
          preview: 4,
          skipEmptyLines: true,
          complete: (result) => {
            setTimeout(() => data.push(result.data), 0);
            if (i + 1 === files.length) {
              const name = file.name;
              setParsing(false);
              setTimeout(() => setter(data, name), 0);
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
