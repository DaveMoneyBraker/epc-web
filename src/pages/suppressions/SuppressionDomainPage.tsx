import React from "react";
import { SuppressionsDomain } from "../../components/suppressions";
import APP_CONSTANTS from "../../constants/AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";

const SuppressionDomainPage: React.FC = () => {
  APP_HOOKS.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_DOMAIN);
  return <SuppressionsDomain />;
};

export default SuppressionDomainPage;
