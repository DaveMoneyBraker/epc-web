import React from "react";
import { BlackListDomains } from "../../components/dnsbl";
import APP_CONSTANTS from "../../constants/AppConstants";
import AppHooks from "../../hooks/0_AppHooks";

const BlackListDomainsPage: React.FC = () => {
  AppHooks.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.BLACKLIST_DOMAINS);

  return <BlackListDomains />;
};

export default BlackListDomainsPage;
