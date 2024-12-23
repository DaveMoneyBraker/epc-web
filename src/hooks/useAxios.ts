import React from "react";
import { useAxiosContext } from "../providers/axios";
import { PaginationResponse } from "../types";

export const useAxios = <T>(
  apiRoute: string
): {
  items: T[];
  totalItems: number;
  loading: boolean;
  get: (query?: string) => void;
} => {
  const [items, setItems] = React.useState<T[]>([]);
  const [totalItems, setTotalItems] = React.useState(0);
  const { axios, loading } = useAxiosContext();

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
