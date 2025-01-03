import React from "react";

// LOADING API URL FROM JSON FILE PUBLIC/CONFIG/CONFIG.JSON
export const useApiUrlLoader = () => {
  const [apiUrl, setApiUrl] = React.useState("");

  const fetchApiUrl = async (): Promise<string> =>
    await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let url: string = res.apiUrl;
        if (!url.endsWith("/")) {
          url += "/";
        }
        // if (!url.endsWith("api/")) {
        //   url += "api/";
        // }
        setApiUrl(url);
        return url;
      });

  const getApiUrl = async (): Promise<string> =>
    apiUrl ? apiUrl : fetchApiUrl();

  return getApiUrl;
};
