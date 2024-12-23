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
  onIsMappedChange: (isMapped: boolean) => void;
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
  onIsMappedChange,
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
      setState((prev) =>
        prev.map((preview, previewIndex) => ({
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
        }))
      );
    },
    []
  );

  const handleSkipColumnChange = React.useCallback(
    (value: boolean, columnIndex: number, rowIndex: number) => {
      setState((prev) => {
        const newState = prev.map((preview, previewIndex) => ({
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
        }));
        // IF ALL COLUMNS IN FILE SKIPPED - SKIP FILE
        return newState.map((preview) => {
          if (preview.columns.every((col) => col.skip)) {
            return { ...preview, skip: true };
          }
          return preview;
        });
      });
    },
    []
  );

  const handleSkipFileChange = React.useCallback(
    (value: boolean, rowIndex: number) =>
      setState((prev) =>
        prev.map((preview, i) => ({
          ...preview,
          skip: i === rowIndex ? value : preview.skip,
        }))
      ),
    []
  );

  const handleStateChanges = React.useCallback(
    (changedState: FileMapperPreview[]) => {
      // IF THERE IS NO STATE
      // OR NO ELEMENTS IN STATE
      // OR EACH FILE IN STATE SKIPPED
      // FALSE (SINCE WE CAN'T SUBMIT 0 FILES)
      if (
        !changedState ||
        changedState.length === 0 ||
        changedState.every((preview) => preview.skip)
      ) {
        return onIsMappedChange(false);
      }

      const isStateMapped = changedState.every((preview) =>
        FileMapperUtils.isFileMapped(preview, requiredHeaders)
      );
      onIsMappedChange(isStateMapped);
    },
    [requiredHeaders, onIsMappedChange]
  );

  React.useEffect(() => {
    handleStateChanges(state);
  }, [state, handleStateChanges]);

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
