import React from "react";
import APP_CONSTANTS from "../../constants/AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";
import { SubmitSuppressionsEmail } from "../../components/suppressions";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SuppressionsSubmitEmailPage: React.FC = () => {
  APP_HOOKS.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_EMAIL);
  return <SubmitSuppressionsEmail />;
};

export default SuppressionsSubmitEmailPage;
