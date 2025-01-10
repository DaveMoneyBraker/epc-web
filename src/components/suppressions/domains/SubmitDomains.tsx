import React from "react";
import { FileMapperProps } from "../../../types";
import { ApiRoutes } from "../../../core/router";
import { FileMapper } from "../../3_shared/fileMapper";
import { useFileUploadWithProgressMutation } from "../../../services/mutations/useFileUploadWithProgressMutation";
import { EnhancedTextField } from "../../1_enhanced";

export const SubmitSuppressionsDomain: React.FC = () => {
  const apiUrl = ApiRoutes.SUPPRESSION_DOMAIN + "/file";
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
  const config: FileMapperProps = React.useMemo(
    () => ({
      availableHeaders: ["domain", "type"],
      requiredHeaders: [["domain"]],
      progress,
      submitted,
      submitError: error,
      AdditionalInputs,
      onFileSubmit: handleFileSubmit,
      reset,
    }),
    [progress, error, submitted, handleFileSubmit, reset, AdditionalInputs]
  );
  return <FileMapper {...config} />;
};
