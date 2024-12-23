import React from "react";
import { SuppressionsMx } from "../../components/suppressions";
import APP_CONSTANTS from "../../constants/AppConstants";
import AppHooks from "../../hooks/0_AppHooks";

const SuppressionMxPage: React.FC = () => {
  AppHooks.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_MX);
  return <SuppressionsMx />;
};

export default SuppressionMxPage;
