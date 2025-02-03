import { TitleValueObject } from "./default";

export type SslProtocol = "http" | "https";

export type SslProtocolMap = {
  [K in Uppercase<SslProtocol>]: Lowercase<SslProtocol>;
};

export type SslProtocolSelectOption = TitleValueObject<SslProtocol>;
