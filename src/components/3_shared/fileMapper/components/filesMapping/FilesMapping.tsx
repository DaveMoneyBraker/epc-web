import React from "react";
import { FileMapperPreview } from "../../../../../types";
import { FileMapperRows } from "./FileMapperRows";
import { Box, styled } from "@mui/material";

interface Props {
  previews: FileMapperPreview[];
  parsing: boolean;
  availableHeaders: string[];
  requiredHeaders: string[][];
  onPreviewsChange: (previews: FileMapperPreview[]) => void;
  AdditionalInputs?: React.ReactNode;
}

const Wrapper = styled(Box)(() => ({
  padding: "10px 0",
  display: "flex",
  flexDirection: "column",
}));

const InputsWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const RowsWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  overflowY: "scroll",
}));

export const FilesMapping: React.FC<Props> = ({
  previews,
  parsing,
  availableHeaders,
  requiredHeaders,
  onPreviewsChange,
  AdditionalInputs,
}) => {
  const handlePreviewsChange = React.useCallback(
    (newValue: FileMapperPreview[]) => onPreviewsChange(newValue),
    [onPreviewsChange]
  );

  return (
    <Wrapper>
      <InputsWrapper>{AdditionalInputs && AdditionalInputs}</InputsWrapper>
      <RowsWrapper>
        <FileMapperRows
          previews={previews}
          parsing={parsing}
          availableHeaders={availableHeaders}
          requiredHeaders={requiredHeaders}
          onPreviewsChange={handlePreviewsChange}
        />
      </RowsWrapper>
    </Wrapper>
  );
};
