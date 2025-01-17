import React from "react";
import { SubmitBlacklistDomains } from "../../components/dnsbl";
import APP_CONSTANTS from "../../constants/AppConstants";
import AppHooks from "../../hooks/0_AppHooks";

const SubmitBlacklistDomainsPage: React.FC = () => {
  AppHooks.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.BLACKLIST_DOMAIN);

  return <SubmitBlacklistDomains />;
};

export default SubmitBlacklistDomainsPage;
