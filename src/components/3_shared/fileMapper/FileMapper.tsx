import React from "react";
import {
  FileMapperPreview,
  FileMapperProps,
  PapaparseRawData,
  StepperConfig,
  Step as StepInterface,
} from "../../../types";
import { useFileParser } from "./hooks";
import { FilesMapping, FileMapperSubmitFile } from "./components";
import FileMapperUtils from "./utils/0_utils";
import { useNavigate } from "react-router-dom";
import { AppDragNDrop } from "../filesDragNDrop";
import { EnhancedStepper } from "../../1_enhanced";

export const FileMapper: React.FC<FileMapperProps> = ({
  fileSize = 15,
  availableHeaders,
  requiredHeaders,
  additionalInputs: AdditionalInputs,
  submitError,
  progress,
  submitted,
  onFileSubmit,
  reset,
}) => {
  const navigate = useNavigate();
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
      } else if (activeStep === 0) {
        navigate(v);
      } else if (activeStep === 1) {
        setPreviews([]);
      }
      // IN CASE IF CURRENT STEP INDEX IS 0 AND SOMEHOW USER COME TO THIS PAGE DIRECTLY
      // SO IT WILL NO GIVE -1 AS CURRENT STEP
      setActiveStep((prev) => Math.max(0, prev + v));
    },
    [
      activeStep,
      reset,
      handleFirstStepCompleted,
      handleSecondStepCompleted,
      navigate,
      setPreviews,
    ]
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

  const steps = React.useMemo<StepInterface[]>(
    () => [
      {
        title: "Select Files",
        element: (
          <AppDragNDrop
            fileSizeLimit={fileSize}
            selectedFiles={selectedFiles}
            onFilesSelect={handleFilesSelect}
            onFileDelete={handleFileDelete}
          />
        ),
        completed: filesSelected,
      },
      {
        title: "Map Files",
        element: (
          <FilesMapping
            previews={previews}
            parsing={parsing}
            availableHeaders={availableHeaders}
            requiredHeaders={requiredHeaders}
            onPreviewsChange={handlePreviewsChange}
            additionalInputs={AdditionalInputs}
          />
        ),
        completed: filesMapped,
      },
      {
        title: "Submit Files",
        element: (
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
        ),
        completed: false,
      },
    ],
    [
      AdditionalInputs,
      availableHeaders,
      fileSize,
      filename,
      filesMapped,
      filesSelected,
      handleFileDelete,
      handleFilenameChange,
      handleFilesSelect,
      handlePreviewsChange,
      handleStepperReset,
      handleSubmit,
      mappingComplete,
      parsing,
      previews,
      progress,
      requiredHeaders,
      selectedFiles,
      submitError,
      submitted,
    ]
  );

  const stepperConfigs = React.useMemo<StepperConfig>(
    () => ({
      steps,
      activeStep,
      onStepChange: handleStepChange,
    }),
    [activeStep, steps, handleStepChange]
  );
  return <EnhancedStepper configs={stepperConfigs} />;
};
