import React from "react";
import { FileMapperPreview } from "../../../../types";
import { FileMapperColumn } from "./FileMapperColumn";
import { Box, Button, styled, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { EnhancedCheckbox } from "../../../1_enhanced";

interface Props {
  preview: FileMapperPreview;
  index: number;
  availableHeaders: string[];
  requiredHeaders: string[][];
  onColumnHeaderChange: (
    value: string,
    columnIndex: number,
    rowIndex: number
  ) => void;
  onSkipColumnChange: (
    value: boolean,
    columnIndex: number,
    rowIndex: number
  ) => void;
  onSkipFileChange: (value: boolean, rowIndex: number) => void;
}

const Wrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "calc(100vw - 30px)",
  width: "calc(100vw - 30px)",
}));

const HeaderWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px",
  "& .MuiBox-root": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },
}));

const ColumnsWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  overflowX: "scroll",
}));

export const FileMapperRow: React.FC<Props> = ({
  preview,
  index,
  availableHeaders,
  requiredHeaders,
  onColumnHeaderChange,
  onSkipColumnChange,
  onSkipFileChange,
}) => {
  const unmappedItemsCount = React.useMemo(
    () =>
      preview.columns.reduce((prev, curr) => {
        if (!curr.header && !curr.skip) {
          return prev + 1;
        }
        return prev;
      }, 0),
    [preview]
  );

  const handleColumnHeaderChange = React.useCallback(
    (value: string, columnIndex: number) =>
      onColumnHeaderChange(value, columnIndex, index),
    [index, onColumnHeaderChange]
  );
  const handleSkipColumnChange = React.useCallback(
    (value: boolean, columnIndex: number) =>
      onSkipColumnChange(value, columnIndex, index),
    [index, onSkipColumnChange]
  );

  const handleSkipFileChange = React.useCallback(
    (value: boolean) => onSkipFileChange(value, index),
    [index, onSkipFileChange]
  );

  return (
    <Wrapper>
      {preview && preview.filename && (
        <HeaderWrapper>
          <Box>
            <Typography variant="h6">
              {index + 1}. {preview.filename}
            </Typography>
            <EnhancedCheckbox
              fullWidth={false}
              value={preview.skip}
              label="Skip File"
              onChange={handleSkipFileChange}
            />
          </Box>
          {!preview.skip && unmappedItemsCount > 0 && (
            <Box>
              <Box>
                <ErrorIcon color="warning" />
                <Typography variant="warning">
                  unmapped columns count: {unmappedItemsCount}
                </Typography>
              </Box>
              <Button variant="outlined" size="small">
                skip unmapped columns
              </Button>
            </Box>
          )}
        </HeaderWrapper>
      )}
      <ColumnsWrapper>
        {preview &&
          preview.columns &&
          preview.columns.map((column, i) => (
            <FileMapperColumn
              fileSkip={preview.skip}
              index={i}
              column={column}
              availableHeaders={availableHeaders}
              onColumnHeaderChange={handleColumnHeaderChange}
              onSkipColumnChange={handleSkipColumnChange}
              key={i}
            />
          ))}
      </ColumnsWrapper>
    </Wrapper>
  );
};
