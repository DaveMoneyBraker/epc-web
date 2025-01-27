import React from "react";
import { BlacklistDomain } from "../../components/dnsbl";
import APP_CONSTANTS from "../../constants/AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";

const BlackListDomainPage: React.FC = () => {
  APP_HOOKS.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.BLACKLIST_DOMAIN);

  return <BlacklistDomain />;
};

export default BlackListDomainPage;
