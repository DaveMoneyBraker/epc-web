import React from "react";
import APP_CONSTANTS from "../../constants/0_AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";
import { MailerPartnerAccess } from "../../components/partners/mailerPartnersAccess";

const MailerPartnerAccessPage: React.FC = () => {
  APP_HOOKS.useEPCDocumentTitle(
    APP_CONSTANTS.PAGE_TITLES.MAILER_PARTNERS_ACCESS
  );
  return <MailerPartnerAccess />;
};

export default MailerPartnerAccessPage;
