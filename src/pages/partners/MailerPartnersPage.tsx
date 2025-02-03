import React from "react";
import APP_CONSTANTS from "../../constants/0_AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";
import { MailerPartners } from "../../components/partners";

const MailerPartnersPage: React.FC = () => {
  APP_HOOKS.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.MAILER_PARTNERS);
  return <MailerPartners />;
};

export default MailerPartnersPage;
