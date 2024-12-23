import React from "react";
import { FileMapperProps } from "../../../types";
import { ApiRoutes } from "../../../core/router";
import { FileMapper } from "../../3_shared/fileMapper";

export const SubmitSuppressionsDomain: React.FC = () => {
  const config: FileMapperProps = {
    apiUrl: ApiRoutes.SUPPRESSION_DOMAIN + "/file",
    availableHeaders: ["domain", "type"],
    requiredHeaders: [["domain"]],
  };
  return <FileMapper {...config} />;
};
