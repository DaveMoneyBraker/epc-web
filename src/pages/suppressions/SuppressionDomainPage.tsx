import React from "react";
import { SuppressionsDomain } from "../../components/suppressions";
import APP_CONSTANTS from "../../constants/AppConstants";
import AppHooks from "../../hooks/0_AppHooks";

const SuppressionDomainPage: React.FC = () => {
  AppHooks.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_DOMAIN);
  return <SuppressionsDomain />;
};

export default SuppressionDomainPage;
