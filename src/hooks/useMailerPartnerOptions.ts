import React from "react";
import APP_QUERIES from "../services/queries/AppQueries";
import { SelectOption } from "../types";

export type UseMailerPartnerOptions = () => SelectOption[];

export const useMailerPartnerOptions: UseMailerPartnerOptions = () => {
  const { data } = APP_QUERIES.useMailerPartnerArray();
  return React.useMemo<SelectOption[]>(
    () =>
      data.map((partner) => ({
        title: partner.name,
        value: partner.id,
      })),
    [data]
  );
};
