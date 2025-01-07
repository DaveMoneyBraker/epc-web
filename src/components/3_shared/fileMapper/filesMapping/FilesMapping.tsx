import React from "react";
import { FileMapperPreview } from "../../../../types";
import { FileMapperRows } from "./FileMapperRows";
import { EnhancedTextField } from "../../../1_enhanced";
import { Box, styled } from "@mui/material";

interface Props {
  newFileName: string;
  previews: FileMapperPreview[];
  parsing: boolean;
  availableHeaders: string[];
  requiredHeaders: string[][];
  onPreviewsChange: (previews: FileMapperPreview[]) => void;
  onNewFileNameChange: (value: string) => void;
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
  newFileName,
  previews,
  parsing,
  availableHeaders,
  requiredHeaders,
  onPreviewsChange,
  onNewFileNameChange,
  AdditionalInputs,
}) => {
  const handlePreviewsChange = React.useCallback(
    (newValue: FileMapperPreview[]) => onPreviewsChange(newValue),
    [onPreviewsChange]
  );

  const handleNewFileNameChange = React.useCallback(
    (value: string) => {
      onNewFileNameChange(value);
    },
    [onNewFileNameChange]
  );
  return (
    <Wrapper>
      <InputsWrapper>
        <EnhancedTextField
          fullWidth={false}
          value={newFileName}
          onChange={handleNewFileNameChange}
        />
        {AdditionalInputs && AdditionalInputs}
      </InputsWrapper>
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
