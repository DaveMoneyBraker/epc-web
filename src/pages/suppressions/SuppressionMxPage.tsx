import React from "react";
import { SuppressionsMx } from "../../components/suppressions";
import APP_CONSTANTS from "../../constants/0_AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";

const SuppressionMxPage: React.FC = () => {
  APP_HOOKS.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_MX);
  return <SuppressionsMx />;
};

export default SuppressionMxPage;
