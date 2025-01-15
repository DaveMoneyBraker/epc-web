import React from "react";
import { FileMapperProps } from "../../../types";
import { ApiRoutes } from "../../../core/router";
import { FileMapper } from "../../3_shared/fileMapper";
import { useFileUploadWithProgressMutation } from "../../../services/mutations/useFileUploadWithProgressMutation";

export const SubmitSuppressionsMx: React.FC = () => {
  const apiUrl = ApiRoutes.SUPPRESSION_MX + "/file";
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
      availableHeaders: ["mx", "type"],
      requiredHeaders: [["mx"]],
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
