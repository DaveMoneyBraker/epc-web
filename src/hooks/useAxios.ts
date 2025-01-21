import React from "react";
import { PaginationResponse } from "../types";
import ContextHooks from "../providers/0_ContextHooks";

export const useAxios = <T>(
  apiRoute: string
): {
  items: T[];
  totalItems: number;
  loading: boolean;
  get: (query?: string) => void;
} => {
  const { axios, loading } = ContextHooks.useAxiosContext();
  const [items, setItems] = React.useState<T[]>([]);
  const [totalItems, setTotalItems] = React.useState(0);

  const get = (query = "?page=1&limit=100") => {
    axios &&
      axios(apiRoute + query, { method: "GET" })
        .then((response) => {
          const { totalItems: total, items: data } =
            response.data as PaginationResponse<T>;
          setItems(data);
          setTotalItems(total);
        })
        .catch();
  };

  return { items, totalItems, loading, get };
};
