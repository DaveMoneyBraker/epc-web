import React from "react";
import { FileMapperPreview } from "../../../../../types";
import { FileMapperColumn } from "./FileMapperColumn";
import { Box, Button, styled, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { EnhancedCheckbox } from "../../../../1_enhanced";

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
  onContainHeadersChange: (value: boolean, rowIndex: number) => void;
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
  // "& .MuiBox-root": {
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   gap: "20px",
  // },
}));

const HeaderContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
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
  onContainHeadersChange,
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

  const unmappedHeadersMessage = React.useMemo(() => {
    const mappedHeaders = preview.columns
      .filter((column) => !column.skip && column.header)
      .map((column) => column.header);
    const unmappedRequiredHeaderPairs = requiredHeaders.filter(
      (requiredHeaderPair) =>
        !requiredHeaderPair.some((requiredHeader) =>
          mappedHeaders.some((mappedHeader) => mappedHeader === requiredHeader)
        )
    );
    if (unmappedRequiredHeaderPairs.length === 0) {
      return "";
    }
    let value = "Required headers: ";
    unmappedRequiredHeaderPairs.forEach(
      (headersPair, i) =>
        (value +=
          JSON.stringify(headersPair) +
          (i + 1 === unmappedRequiredHeaderPairs.length ? "." : ","))
    );
    return value;
  }, [preview, requiredHeaders]);

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

  const handleContainHeadersChange = React.useCallback(
    (value: boolean) => onContainHeadersChange(value, index),
    [index, onContainHeadersChange]
  );

  return (
    <Wrapper>
      {preview && preview.filename && (
        <HeaderWrapper>
          <HeaderContainer>
            <Typography variant="h6">
              {index + 1}. {preview.filename}
            </Typography>
            <EnhancedCheckbox
              fullWidth={false}
              value={preview.containHeaders}
              label="Contain headers"
              onChange={handleContainHeadersChange}
            />
            <EnhancedCheckbox
              fullWidth={false}
              value={preview.skip}
              label="Skip File"
              onChange={handleSkipFileChange}
            />
            {unmappedHeadersMessage && (
              <Typography variant="body2">{unmappedHeadersMessage}</Typography>
            )}
          </HeaderContainer>
          {!preview.skip && unmappedItemsCount > 0 && (
            <HeaderContainer>
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <ErrorIcon color="warning" />
                <Typography variant="warning">
                  unmapped columns count: {unmappedItemsCount}
                </Typography>
              </Box>
              <Button variant="outlined" size="small">
                skip unmapped columns
              </Button>
            </HeaderContainer>
          )}
        </HeaderWrapper>
      )}
      <ColumnsWrapper>
        {preview &&
          preview.columns &&
          preview.columns.map((column, i) => (
            <FileMapperColumn
              fileSkip={preview.skip}
              containHeaders={preview.containHeaders}
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
