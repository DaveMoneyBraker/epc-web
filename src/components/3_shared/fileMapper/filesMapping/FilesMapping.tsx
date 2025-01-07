import React from "react";
import { FileMapperPreview } from "../../../../types";
import { FileMapperRows } from "./FileMapperRows";

interface Props {
  newFileName: string;
  previews: FileMapperPreview[];
  parsing: boolean;
  availableHeaders: string[];
  requiredHeaders: string[][];
  onPreviewsChange: (previews: FileMapperPreview[]) => void;
  onNewFileNameChange: (value: string) => void;
}

export const FilesMapping: React.FC<Props> = ({
  newFileName,
  previews,
  parsing,
  availableHeaders,
  requiredHeaders,
  onPreviewsChange,
  onNewFileNameChange,
}) => {
  const handlePreviewsChange = React.useCallback(
    (newValue: FileMapperPreview[]) => onPreviewsChange(newValue),
    [onPreviewsChange]
  );
  return (
    <>
      <FileMapperRows
        previews={previews}
        parsing={parsing}
        availableHeaders={availableHeaders}
        requiredHeaders={requiredHeaders}
        onPreviewsChange={handlePreviewsChange}
      />
    </>
  );
};
