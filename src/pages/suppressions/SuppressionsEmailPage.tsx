import React from "react";
import { SuppressionsEmail } from "../../components/suppressions";
import APP_CONSTANTS from "../../constants/AppConstants";
import AppHooks from "../../hooks/0_AppHooks";

const SuppressionsEmailPage: React.FC = () => {
  AppHooks.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_EMAIL);
  return <SuppressionsEmail />;
};

export default SuppressionsEmailPage;
