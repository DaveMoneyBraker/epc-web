import { InternalAxiosRequestConfig } from "axios";

// ENCODE FORBIDDEN QUERY SYMBOLS - /#+
export const encodeConfigURI = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { url, method } = config;
  if (!url || !method || method !== "get") {
    return config;
  }
  const queryStartIndex = url.indexOf("?");
  if (queryStartIndex < 0) {
    return config;
  }
  const query = url.slice(queryStartIndex);
  const forbiddenSymbols: string[] = `/#+`.split("");
  let validQuery = query;
  forbiddenSymbols.forEach((s) => {
    if (validQuery.includes(s)) {
      validQuery = validQuery.replaceAll(s, encodeURIComponent(s));
    }
  });
  const encodedUrl = url.split("?")[0] + validQuery;
  config.url = encodedUrl;
  return config;
};
