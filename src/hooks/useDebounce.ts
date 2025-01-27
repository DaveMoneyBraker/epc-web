import React from "react";

export type UseDebounce = <T = any>(
  callback: (v: T) => any,
  value: T,
  delay?: number
) => void;

export const useDebounce: UseDebounce = <T = any>(
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
