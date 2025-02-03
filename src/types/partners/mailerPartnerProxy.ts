import { DefaultAppItem, SslProtocol } from "../default";

export interface MailerPartnerProxy extends DefaultAppItem {
  name: string;
  host: string;
  port: number;
  protocol: SslProtocol;
  username: string;
  password: string;
  mailerPartnerId: string;
}
