import { SslProtocolSelectOption, SslProtocolMap } from "../types";

export const SSL_PROTOCOL: SslProtocolMap = {
  HTTP: "http",
  HTTPS: "https",
};

export const SSL_PROTOCOL_OPTIONS: SslProtocolSelectOption[] = [
  { title: SSL_PROTOCOL.HTTP, value: SSL_PROTOCOL.HTTP },
  { title: SSL_PROTOCOL.HTTPS, value: SSL_PROTOCOL.HTTPS },
];
