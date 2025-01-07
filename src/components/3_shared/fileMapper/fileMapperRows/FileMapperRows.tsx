import React from "react";
import { FileMapperRow } from "./FileMapperRow";
import { FileMapperPreview } from "../../../../types";
import FileMapperUtils from "../utils/0_utils";
import { Box, Divider, styled } from "@mui/material";
import { AppBackdrop } from "../../../0_layout/Backdrop";

interface Props {
  previews: FileMapperPreview[];
  parsing: boolean;
  availableHeaders: string[];
  requiredHeaders: string[][];
  onPreviewsChange: (previews: FileMapperPreview[]) => void;
}

const Wrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const FileMapperRows: React.FC<Props> = ({
  previews,
  parsing,
  availableHeaders,
  requiredHeaders,
  onPreviewsChange,
}) => {
  const [state, setState] = React.useState<FileMapperPreview[]>([]);

  // CHANGE FILE HEADERS
  // IF DUPLICATED OR NOT EXISTING IN AVAILABLE_HEADERS HEADERS - REMOVE IT
  React.useEffect(() => {
    setState(
      FileMapperUtils.proceedPreviewsHeaders(previews, availableHeaders)
    );
  }, [previews, availableHeaders]);

  const handleHeaderChange = React.useCallback(
    (value: string, columnIndex: number, rowIndex: number) => {
      const newValue = previews.map((preview, previewIndex) => ({
        ...preview,
        columns: preview.columns.map((col, currentColIndex) => {
          // MAKE CHANGES ONLY IN REQUESTED FILE/ROW
          if (previewIndex === rowIndex) {
            if (columnIndex === currentColIndex) {
              return {
                ...col,
                header: value,
              };
            }
            // IF SAME HEADER IS TAKEN - CLEAR IT (NO HEADER DUPLICATES ALLOWED)
            if (col.header === value && columnIndex !== currentColIndex) {
              return {
                ...col,
                header: "",
              };
            }
          }
          return col;
        }),
      }));
      onPreviewsChange(newValue);
    },
    [previews, onPreviewsChange]
  );

  const handleSkipColumnChange = React.useCallback(
    (value: boolean, columnIndex: number, rowIndex: number) => {
      const newValue = previews
        .map((preview, previewIndex) => ({
          ...preview,
          columns: preview.columns.map((col, currentColIndex) => {
            // MAKE CHANGES ONLY IN REQUESTED FILE/ROW
            if (previewIndex === rowIndex) {
              if (columnIndex === currentColIndex) {
                return {
                  ...col,
                  skip: value,
                  header: "",
                };
              }
            }
            return col;
          }),
        }))
        // IF ALL COLUMNS IN FILE SKIPPED - SKIP FILE
        .map((preview) => {
          if (preview.columns.every((col) => col.skip)) {
            return { ...preview, skip: true };
          }
          return preview;
        });
      onPreviewsChange(newValue);
    },
    [previews, onPreviewsChange]
  );

  const handleSkipFileChange = React.useCallback(
    (value: boolean, rowIndex: number) => {
      const newValue = previews.map((preview, i) => ({
        ...preview,
        skip: i === rowIndex ? value : preview.skip,
      }));
      onPreviewsChange(newValue);
    },
    [previews, onPreviewsChange]
  );

  return (
    <Wrapper>
      <AppBackdrop loading={parsing} />
      {state.map((preview, i) => (
        <div key={i}>
          <FileMapperRow
            preview={preview}
            requiredHeaders={requiredHeaders}
            index={i}
            availableHeaders={availableHeaders}
            onColumnHeaderChange={handleHeaderChange}
            onSkipColumnChange={handleSkipColumnChange}
            onSkipFileChange={handleSkipFileChange}
          />
          <Divider />
        </div>
      ))}
    </Wrapper>
  );
};
