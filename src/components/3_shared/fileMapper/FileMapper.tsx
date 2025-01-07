import React from "react";
import { FileMapperPreview, FileMapperProps } from "../../../types";
import { FileMapperStepper } from "./components/FileMapperStepper";
import { FileMapperDragNDrop } from "./components/FileMapperDragNDrop";
import { useFileParser } from "./hooks";
import { FilesMapping } from "./components/filesMapping";
import FileMapperUtils from "./utils/0_utils";

export const FileMapper: React.FC<FileMapperProps> = ({
  fileSize = 15,
  availableHeaders,
  requiredHeaders,
  AdditionalInputs,
}) => {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<FileMapperPreview[]>([]);
  const [newFileName, setNewFileName] = React.useState("newFileName");
  const { parsing, parse } = useFileParser();

  // FIRST STEP
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

  const handleFirstStepCompleted = React.useCallback(
    () => parse(selectedFiles, proceedPreviewData),
    [selectedFiles, parse, proceedPreviewData]
  );

  const filesSelected = React.useMemo(
    () => selectedFiles && selectedFiles.length > 0,
    [selectedFiles]
  );

  // SECOND STEP
  const handlePreviewsChange = React.useCallback(
    (value: FileMapperPreview[]) => setPreviews(value),
    [setPreviews]
  );

  const handleNewFileNameChange = React.useCallback(
    (newValue: string) => setNewFileName(newValue),
    [setNewFileName]
  );

  const handleSecondStepCompleted = React.useCallback(() => {
    FileMapperUtils.getMappedFilesString(previews, selectedFiles);
  }, [previews, selectedFiles]);

  const filesMapped = React.useMemo(() => {
    // NEW FILE NAME IS REQUIRED
    if (!newFileName) {
      return false;
    }
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
  }, [newFileName, previews, requiredHeaders]);

  return (
    <FileMapperStepper
      FirstStep={
        <FileMapperDragNDrop
          fileSizeLimit={fileSize}
          selectedFiles={selectedFiles}
          onFilesSelect={handleFilesSelect}
          onFileDelete={handleFileDelete}
        />
      }
      firstStepCompleted={filesSelected}
      onFirstStepCompleted={handleFirstStepCompleted}
      SecondStep={
        <FilesMapping
          newFileName={newFileName}
          previews={previews}
          parsing={parsing}
          availableHeaders={availableHeaders}
          requiredHeaders={requiredHeaders}
          onPreviewsChange={handlePreviewsChange}
          onNewFileNameChange={handleNewFileNameChange}
          AdditionalInputs={AdditionalInputs}
        />
      }
      secondStepCompleted={filesMapped}
      onSecondStepCompleted={handleSecondStepCompleted}
    />
  );
};
