import React from "react";

export const useCacheKey = () =>
  React.useCallback((config: any): string => {
    return `${config.method}-${config.url}-${JSON.stringify(
      config.params || {}
    )}-${JSON.stringify(config.data || {})}`;
  }, []);
