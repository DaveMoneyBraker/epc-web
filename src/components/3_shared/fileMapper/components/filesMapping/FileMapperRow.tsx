import React from "react";
import { FileMapperPreview } from "../../../../../types";
import { FileMapperColumn } from "./FileMapperColumn";
import { Box, styled, Tooltip, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { EnhancedButton, EnhancedCheckbox } from "../../../../1_enhanced";
import FileMapperUtils from "../../utils/0_utils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
  onSkipUnmappedColumns: (index: number) => void;
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
}));

const HeaderContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
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
  onSkipUnmappedColumns,
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

  const fileMapped = FileMapperUtils.isFileMapped(preview, requiredHeaders);
  const fileSkipped = React.useMemo(() => preview.skip, [preview]);
  const headerColor = React.useMemo(
    () =>
      fileSkipped
        ? "text.disabled"
        : fileMapped
        ? "primary.main"
        : "warning.main",
    [fileMapped, fileSkipped]
  );

  const fileStatusMessage = React.useMemo(() => {
    if (fileMapped) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CheckCircleIcon color="primary" fontSize="small" />
          <Typography variant="body2">File mapped!</Typography>
        </Box>
      );
    }
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
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CheckCircleIcon color="primary" fontSize="small" />
          <Typography variant="body2">
            All required headers are mapped!
          </Typography>
        </Box>
      );
    }
    let value = "";
    unmappedRequiredHeaderPairs.forEach(
      (headersPair, i) =>
        (value +=
          JSON.stringify(headersPair) +
          (i + 1 === unmappedRequiredHeaderPairs.length ? "." : ","))
    );
    return (
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <Typography variant="body2">Required headers:</Typography>
        <Typography variant="body2" color="warning">
          {value}
        </Typography>
      </Box>
    );
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

  const handleSkipUnmappedColumns = React.useCallback(
    () => onSkipUnmappedColumns(index),
    [index, onSkipUnmappedColumns]
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
            <Typography variant="h6">{index + 1}.</Typography>
            <Tooltip title={preview.filename}>
              <Typography
                color={headerColor}
                variant="h6"
                sx={{
                  maxWidth: "250px",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                {preview.filename}
              </Typography>
            </Tooltip>
            <EnhancedCheckbox
              fullWidth={false}
              value={fileSkipped}
              label="Skip File"
              onChange={handleSkipFileChange}
              sx={{ ml: 1 }}
            />
            {!fileSkipped && (
              <EnhancedCheckbox
                disabled={fileSkipped}
                fullWidth={false}
                value={preview.containHeaders}
                label="Contain headers"
                onChange={handleContainHeadersChange}
              />
            )}
            {!fileSkipped && fileStatusMessage}
          </HeaderContainer>
          {!fileSkipped && unmappedItemsCount > 0 && (
            <HeaderContainer>
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <ErrorIcon color="warning" />
                <Typography variant="warning">
                  unmapped columns count: {unmappedItemsCount}
                </Typography>
              </Box>
              <EnhancedButton
                variant="outlined"
                onClick={handleSkipUnmappedColumns}
              >
                skip unmapped columns
              </EnhancedButton>
            </HeaderContainer>
          )}
        </HeaderWrapper>
      )}
      <ColumnsWrapper>
        {preview &&
          preview.columns &&
          preview.columns.map((column, i) => (
            <FileMapperColumn
              fileSkipped={fileSkipped}
              containHeaders={preview.containHeaders}
              index={i}
              column={column}
              availableHeaders={availableHeaders}
              onColumnHeaderChange={handleColumnHeaderChange}
              onSkipColumnChange={handleSkipColumnChange}
              key={`column-${column.header}-${i}`}
            />
          ))}
      </ColumnsWrapper>
    </Wrapper>
  );
};
