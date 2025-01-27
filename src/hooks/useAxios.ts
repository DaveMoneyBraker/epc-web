import React from "react";
import { PaginationResponse } from "../types";
import ContextHooks from "../providers/0_ContextHooks";

interface Value<T> {
  items: T[];
  totalItems: number;
  loading: boolean;
  get: (query?: string) => void;
}

export const useAxios = <T = unknown>(apiRoute: string): Value<T> => {
  const { axios, loading } = ContextHooks.useAxiosContext();
  const [items, setItems] = React.useState<T[]>([]);
  const [totalItems, setTotalItems] = React.useState(0);

  const get = React.useCallback(
    (query = "?page=1&limit=100") => {
      axios &&
        axios(apiRoute + query, { method: "GET" })
          .then((response) => {
            const { totalItems: total, items: data } =
              response.data as PaginationResponse<T>;
            setItems(data);
            setTotalItems(total);
          })
          .catch();
    },
    [apiRoute, axios]
  );

  return React.useMemo(
    () => ({ items, totalItems, loading, get }),
    [get, items, loading, totalItems]
  );
};
