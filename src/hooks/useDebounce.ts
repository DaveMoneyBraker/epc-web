import React from "react";

export const useDebounce = <T>(
  callback: (v: T) => any,
  value: T,
  delay = 700
) => {
  React.useEffect(() => {
    const timer = setTimeout(() => callback(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, value, delay]);
};
