import React from "react";
import { FileMapperProps } from "../../../types";
import { FileMapper } from "../../3_shared/fileMapper";
import { useFileUploadWithProgressMutation } from "../../../services/mutations/useFileUploadWithProgressMutation";
import { EnhancedTextField } from "../../1_enhanced";
import APP_CONSTANTS from "../../../constants/AppConstants";

export const SubmitSuppressionsDomain: React.FC = () => {
  const apiUrl = React.useMemo(
    () => APP_CONSTANTS.API_ROUTES.SUPPRESSION_DOMAIN + "/file",
    []
  );
  const { mutation, progress, submitted, error, reset } =
    useFileUploadWithProgressMutation(apiUrl);
  const handleFileSubmit = React.useCallback(
    (file: string, filename: string) => {
      mutation.mutate({ file, filename });
    },
    [mutation]
  );

  const AdditionalInputs = React.useMemo(
    () => (
      <EnhancedTextField
        helperText={`not allowed: . , + / \\  ' \` " whitespace`}
        fullWidth={false}
        value={""}
        onChange={() => {}}
      />
    ),
    []
  );

  const config = React.useMemo<FileMapperProps>(
    () => ({
      availableHeaders: ["domain", "type"],
      requiredHeaders: [["domain"]],
      progress,
      submitted,
      submitError: error,
      additionalInputs: AdditionalInputs,
      onFileSubmit: handleFileSubmit,
      reset,
    }),
    [progress, error, submitted, handleFileSubmit, reset, AdditionalInputs]
  );
  return <FileMapper {...config} />;
};
