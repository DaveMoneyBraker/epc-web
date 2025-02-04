import APP_CONSTANTS from "../../../constants/0_AppConstants";
import { MailerPartner } from "../../../types";
import APP_QUERIES from "../AppQueries";

export const useMailerPartnerArray = () => {
  const partnerApiUrl = APP_CONSTANTS.API_ROUTES.MAILER_PARTNER;
  const queryKey = APP_CONSTANTS.QUERY_KEYS.MAILER_PARTNER;
  return APP_QUERIES.useArrayQuery<MailerPartner>({
    apiUrl: partnerApiUrl,
    queryKey,
  });
};
