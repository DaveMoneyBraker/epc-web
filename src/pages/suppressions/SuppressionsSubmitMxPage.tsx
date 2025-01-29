import React from "react";
import APP_CONSTANTS from "../../constants/0_AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";
import { SubmitSuppressionsMx } from "../../components/suppressions/mx/SubmitMx";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SuppressionsSubmitMxPage: React.FC = () => {
  APP_HOOKS.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_MX);
  return <SubmitSuppressionsMx />;
};

export default SuppressionsSubmitMxPage;
