import React from "react";
import APP_QUERIES from "../services/queries/AppQueries";
import { TitleValueObject } from "../types";

export type UseMailerPartnerOptions = () => TitleValueObject[];

export const useMailerPartnerOptions: UseMailerPartnerOptions = () => {
  const { data } = APP_QUERIES.useMailerPartnerArray();
  return React.useMemo<TitleValueObject[]>(
    () =>
      data.map((partner) => ({
        title: partner.name,
        value: partner.id,
      })),
    [data]
  );
};
