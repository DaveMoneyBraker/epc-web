import React from "react";
import { FileMapperRow } from "./FileMapperRow";
import { FileMapperPreview } from "../../../../../types";
import { Box, Divider, styled } from "@mui/material";
import { LoadingBackdrop } from "../../../../0_layout/Backdrops";

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
        // IF FILE UNSKIPPED - UNSKIP COLUMNS
        columns:
          i === rowIndex
            ? value
              ? preview.columns
              : preview.columns.map((col) => ({ ...col, skip: false }))
            : preview.columns,
      }));
      onPreviewsChange(newValue);
    },
    [previews, onPreviewsChange]
  );

  const handleContainHeadersChange = React.useCallback(
    (containHeaders: boolean, rowIndex: number) => {
      const newValue = previews.map((preview, i) => {
        if (i === rowIndex) {
          return { ...preview, containHeaders };
        }
        return preview;
      });
      onPreviewsChange(newValue);
    },
    [previews, onPreviewsChange]
  );

  return (
    <Wrapper>
      <LoadingBackdrop loading={parsing} />
      {previews.map((preview, i) => (
        <div key={i}>
          <FileMapperRow
            preview={preview}
            requiredHeaders={requiredHeaders}
            index={i}
            availableHeaders={availableHeaders}
            onColumnHeaderChange={handleHeaderChange}
            onSkipColumnChange={handleSkipColumnChange}
            onSkipFileChange={handleSkipFileChange}
            onContainHeadersChange={handleContainHeadersChange}
          />
          <Divider />
        </div>
      ))}
    </Wrapper>
  );
};
