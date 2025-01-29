import React from "react";
import { FileMapperProps } from "../../../types";
import { FileMapper } from "../../3_shared/fileMapper";
import { useFileUploadWithProgressMutation } from "../../../services/mutations/useFileUploadWithProgressMutation";
import APP_CONSTANTS from "../../../constants/0_AppConstants";

export const SubmitSuppressionsEmail: React.FC = () => {
  const apiUrl = React.useMemo(
    () => APP_CONSTANTS.API_ROUTES.SUPPRESSION_EMAIL + "/file",
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

  const config: FileMapperProps = React.useMemo(
    () => ({
      availableHeaders: ["email", "type"],
      requiredHeaders: [["email"]],
      progress,
      submitted,
      submitError: error,
      onFileSubmit: handleFileSubmit,
      reset,
    }),
    [progress, error, submitted, handleFileSubmit, reset]
  );
  return <FileMapper {...config} />;
};
