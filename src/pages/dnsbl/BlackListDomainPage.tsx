import React from "react";
import { BlacklistDomain } from "../../components/dnsbl";
import APP_CONSTANTS from "../../constants/AppConstants";
import AppHooks from "../../hooks/0_AppHooks";

const BlackListDomainPage: React.FC = () => {
  AppHooks.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.BLACKLIST_DOMAIN);

  return <BlacklistDomain />;
};

export default BlackListDomainPage;
