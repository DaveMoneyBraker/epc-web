import React from "react";

export type UseApiUrlLoader = () => () => Promise<string>;

// LOADING API URL FROM JSON FILE PUBLIC/CONFIG/CONFIG.JSON
export const useApiUrlLoader: UseApiUrlLoader = () => {
  const [apiUrl, setApiUrl] = React.useState("");
  const development: boolean =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development";

  const fetchApiUrl = React.useCallback(
    async (): Promise<string> =>
      await fetch("/config/config.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          let url: string = development ? res.devUrl : res.apiUrl;
          if (!url.endsWith("/")) {
            url += "/";
          }
          // if (!url.endsWith("api/")) {
          //   url += "api/";
          // }
          setApiUrl(url);
          return url;
        }),
    [development]
  );

  return React.useCallback(
    async (): Promise<string> => (apiUrl ? apiUrl : fetchApiUrl()),
    [apiUrl, fetchApiUrl]
  );
};
