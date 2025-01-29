import React from "react";
import { SubmitBlacklistDomains } from "../../components/dnsbl";
import APP_CONSTANTS from "../../constants/0_AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";

const SubmitBlacklistDomainsPage: React.FC = () => {
  APP_HOOKS.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.BLACKLIST_DOMAIN);

  return <SubmitBlacklistDomains />;
};

export default SubmitBlacklistDomainsPage;
