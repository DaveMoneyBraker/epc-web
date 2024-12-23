import React from "react";
import { FileMapperPreview, FileMapperProps } from "../../../types";
import { FileMapperStepper } from "./FileMapperStepper";
import { FileMapperDragNDrop } from "./FileMapperDragNDrop";
import { useFileParser } from "./hooks";
import { FileMapperRows } from "./fileMapperRows";
import FileMapperUtils from "./utils/0_utils";

export const FileMapper: React.FC<FileMapperProps> = ({
  fileSize = 15,
  availableHeaders,
  requiredHeaders,
  apiUrl,
}) => {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [isMapped, setIsMapped] = React.useState(false);
  const [previews, setPreviews] = React.useState<FileMapperPreview[]>([]);
  const { parsing, parse } = useFileParser();

  const handleFilesSelect = React.useCallback(
    (files: File[]) => setSelectedFiles((prev) => [...prev, ...files]),
    [setSelectedFiles]
  );

  const handleFileDelete = React.useCallback(
    (index: number) =>
      setSelectedFiles((prev) => prev.filter((_, i) => i !== index)),
    []
  );

  const proceedPreviewData = React.useCallback(
    (v: string[][][], filename: string) => {
      const newPreviews = FileMapperUtils.getFilesPreview(v, filename);
      setPreviews((prev) => [...prev, ...newPreviews]);
    },
    [setPreviews]
  );

  const handleFirstStepCompleted = React.useCallback(
    () => parse(selectedFiles, proceedPreviewData),
    [selectedFiles, parse, proceedPreviewData]
  );

  const firstStepCompleted = React.useMemo(
    () => selectedFiles && selectedFiles.length > 0,
    [selectedFiles]
  );

  const handleIsMappedChange = React.useCallback(
    (v: boolean) => setIsMapped(v),
    [setIsMapped]
  );

  return (
    <FileMapperStepper
      firstStep={
        <FileMapperDragNDrop
          fileSizeLimit={fileSize}
          selectedFiles={selectedFiles}
          onFilesSelect={handleFilesSelect}
          onFileDelete={handleFileDelete}
        />
      }
      firstStepCompleted={firstStepCompleted}
      onFirstStepCompleted={handleFirstStepCompleted}
      secondStep={
        <FileMapperRows
          previews={previews}
          parsing={parsing}
          availableHeaders={availableHeaders}
          requiredHeaders={requiredHeaders}
          onIsMappedChange={handleIsMappedChange}
        />
      }
      secondStepCompleted={isMapped}
    />
  );
};
