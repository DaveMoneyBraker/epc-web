import React from "react";
import { SuppressionsEmail } from "../../components/suppressions";
import APP_CONSTANTS from "../../constants/0_AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";

const SuppressionsEmailPage: React.FC = () => {
  APP_HOOKS.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_EMAIL);
  return <SuppressionsEmail />;
};

export default SuppressionsEmailPage;
