import React from "react";
import {
  FileMapperPreview,
  FileMapperProps,
  PapaparseRawData,
} from "../../../types";
import { FileMapperStepper } from "./components/FileMapperStepper";
import { FileMapperDragNDrop } from "./components/FileMapperDragNDrop";
import { useFileParser } from "./hooks";
import { FilesMapping } from "./components/filesMapping";
import FileMapperUtils from "./utils/0_utils";
import { FileMapperSubmitFile } from "./components/FileMapperSubmitFile";

export const FileMapper: React.FC<FileMapperProps> = ({
  fileSize = 15,
  availableHeaders,
  requiredHeaders,
  AdditionalInputs,
  submitError,
  progress,
  submitted,
  onFileSubmit,
  reset,
}) => {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<FileMapperPreview[]>([]);
  const [filename, setFilename] = React.useState("NewFilename");
  const [mappedFileString, setMappedFileString] = React.useState("");
  const mappingComplete = React.useMemo(
    () => (mappedFileString ? true : false),
    [mappedFileString]
  );
  const { parsing, parse } = useFileParser();
  // STEPPER
  const [activeStep, setActiveStep] = React.useState(0);

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
    (data: PapaparseRawData[]) => {
      const newPreviews = FileMapperUtils.getFilesPreview(
        data,
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

  const handleFilenameChange = React.useCallback(
    (value: string) => {
      const clearedValue = value
        .replaceAll(".", "")
        .replaceAll(",", "")
        .replaceAll("+", "")
        .replaceAll('"', "")
        .replaceAll("/", "")
        .replaceAll("'", "")
        .replaceAll("`", "")
        .replaceAll("\\", "")
        .replaceAll(" ", "");
      setFilename(clearedValue);
    },
    [setFilename]
  );

  const onMappedFileStringComplete = React.useCallback(
    (value: string) => {
      setMappedFileString(value);
    },
    [setMappedFileString]
  );

  const handleSecondStepCompleted = React.useCallback(() => {
    FileMapperUtils.getMappedFilesString(
      previews,
      selectedFiles,
      onMappedFileStringComplete
    );
  }, [previews, selectedFiles, onMappedFileStringComplete]);

  const filesMapped = React.useMemo(() => {
    // NEW FILE NAME IS REQUIRED
    if (!filename) {
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
  }, [filename, previews, requiredHeaders]);

  // THIRD STEP
  const handleSubmit = React.useCallback(() => {
    onFileSubmit(mappedFileString, filename);
  }, [mappedFileString, filename, onFileSubmit]);

  // STEPPER
  const handleStepChange = React.useCallback(
    (v: 1 | -1) => {
      if (v === 1) {
        switch (activeStep) {
          case 0: {
            handleFirstStepCompleted();
            break;
          }
          case 1: {
            reset && reset();
            handleSecondStepCompleted();
            break;
          }
          default:
            break;
        }
      }
      setActiveStep((prev) => prev + v);
    },
    [activeStep, reset, handleFirstStepCompleted, handleSecondStepCompleted]
  );

  const handleStepperReset = React.useCallback(() => {
    setPreviews([]);
    setSelectedFiles([]);
    setFilename("NewFilename");
    setMappedFileString("");
    setActiveStep(0);
  }, [
    setPreviews,
    setSelectedFiles,
    setFilename,
    setMappedFileString,
    setActiveStep,
  ]);

  return (
    <FileMapperStepper
      activeStep={activeStep}
      onStepChange={handleStepChange}
      FirstStep={
        <FileMapperDragNDrop
          fileSizeLimit={fileSize}
          selectedFiles={selectedFiles}
          onFilesSelect={handleFilesSelect}
          onFileDelete={handleFileDelete}
        />
      }
      firstStepCompleted={filesSelected}
      SecondStep={
        <FilesMapping
          previews={previews}
          parsing={parsing}
          availableHeaders={availableHeaders}
          requiredHeaders={requiredHeaders}
          onPreviewsChange={handlePreviewsChange}
          AdditionalInputs={AdditionalInputs}
        />
      }
      secondStepCompleted={filesMapped}
      ThirdStep={
        <FileMapperSubmitFile
          filename={filename}
          onFilenameChange={handleFilenameChange}
          mappingComplete={mappingComplete}
          progress={progress}
          error={submitError}
          submitted={submitted}
          onSubmit={handleSubmit}
          onReset={handleStepperReset}
        />
      }
    />
  );
};
