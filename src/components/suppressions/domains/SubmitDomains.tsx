import React from "react";
import { FileMapperProps } from "../../../types";
import { ApiRoutes } from "../../../core/router";
import { FileMapper } from "../../3_shared/fileMapper";
import { useFileUploadWithProgressMutation } from "../../../services/mutations/useFileUploadWithProgressMutation";

export const SubmitSuppressionsDomain: React.FC = () => {
  const apiUrl = ApiRoutes.SUPPRESSION_DOMAIN + "/file";
  const { mutation, progress, submitted } =
    useFileUploadWithProgressMutation(apiUrl);

  const handleFileSubmit = React.useCallback(
    (file: string | File, filename: string) => {},
    []
  );
  const config: FileMapperProps = React.useMemo(
    () => ({
      availableHeaders: ["domain", "type"],
      requiredHeaders: [["domain"]],
      progress,
      submitted,
      onFileSubmit: handleFileSubmit,
    }),
    [progress, submitted, handleFileSubmit]
  );
  return <FileMapper {...config} />;
};
