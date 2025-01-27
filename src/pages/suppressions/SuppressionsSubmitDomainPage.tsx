import React from "react";
import { SubmitSuppressionsDomain } from "../../components/suppressions";
import APP_CONSTANTS from "../../constants/AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SuppressionsSubmitDomainPage: React.FC = () => {
  APP_HOOKS.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_DOMAIN);
  return <SubmitSuppressionsDomain />;
};

export default SuppressionsSubmitDomainPage;
