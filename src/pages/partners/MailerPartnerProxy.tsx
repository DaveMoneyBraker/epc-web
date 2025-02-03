import React from "react";
import APP_CONSTANTS from "../../constants/0_AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";
import { MailerPartnerProxy } from "../../components/partners/mailerPartnerProxy/MailerPartnerProxy";

const MailerPartnerProxyPage: React.FC = () => {
  APP_HOOKS.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.MAILER_PARTNER_PROXY);
  return <MailerPartnerProxy />;
};

export default MailerPartnerProxyPage;
