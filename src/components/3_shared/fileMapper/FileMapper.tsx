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
      const newPreviews = FileMapperUtils.getFilesPreview(
        v,
        filename,
        availableHeaders
      );
      setPreviews((prev) => [...prev, ...newPreviews]);
    },
    [availableHeaders, setPreviews]
  );

  const handlePreviewsChange = React.useCallback(
    (value: FileMapperPreview[]) => setPreviews(value),
    [setPreviews]
  );

  const handleFirstStepCompleted = React.useCallback(
    () => parse(selectedFiles, proceedPreviewData),
    [selectedFiles, parse, proceedPreviewData]
  );

  const filesSelected = React.useMemo(
    () => selectedFiles && selectedFiles.length > 0,
    [selectedFiles]
  );

  const handleSecondStepCompleted = React.useCallback(() => {}, []);

  const mapped = React.useMemo(() => {
    // IF THERE IS NO STATE
    // OR NO ELEMENTS IN STATE
    // OR EACH FILE IN STATE SKIPPED
    // FALSE (SINCE WE CAN'T SUBMIT 0 FILES)
    if (
      !previews ||
      previews.length === 0 ||
      previews.every((preview) => preview.skip)
    ) {
      return false;
    }

    const isStateMapped = previews.every((preview) =>
      FileMapperUtils.isFileMapped(preview, requiredHeaders)
    );
    return isStateMapped;
  }, [previews, requiredHeaders]);

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
      firstStepCompleted={filesSelected}
      onFirstStepCompleted={handleFirstStepCompleted}
      secondStep={
        <FileMapperRows
          previews={previews}
          parsing={parsing}
          availableHeaders={availableHeaders}
          requiredHeaders={requiredHeaders}
          onPreviewsChange={handlePreviewsChange}
        />
      }
      secondStepCompleted={mapped}
      onSecondStepCompleted={handleSecondStepCompleted}
    />
  );
};
