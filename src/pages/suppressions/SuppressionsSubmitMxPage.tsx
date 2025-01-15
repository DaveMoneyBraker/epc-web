import React from "react";
import APP_CONSTANTS from "../../constants/AppConstants";
import AppHooks from "../../hooks/0_AppHooks";
import { SubmitSuppressionsMx } from "../../components/suppressions/mx/SubmitMx";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SuppressionsSubmitMxPage: React.FC = () => {
  AppHooks.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_MX);
  return <SubmitSuppressionsMx />;
};

export default SuppressionsSubmitMxPage;
