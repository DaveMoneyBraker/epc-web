import React from "react";
import { SuppressionsMask } from "../../components/suppressions";
import APP_CONSTANTS from "../../constants/AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";

const SuppressionMaskPage: React.FC = () => {
  APP_HOOKS.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_MASK);
  return <SuppressionsMask />;
};

export default SuppressionMaskPage;
