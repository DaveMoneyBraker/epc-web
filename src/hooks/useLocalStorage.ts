import React from "react";

interface Value<T> {
  get: (key: string) => T;
  set: (key: string, value: any) => void;
  clear: () => void;
}

export const useLocalStorage = <T = unknown>(): Value<T> => {
  const get = React.useCallback((key: string) => {
    try {
      return JSON.parse(localStorage.getItem(key) || "");
    } catch (err) {
      console.log({ err });
      return "";
    }
  }, []);
  const set = React.useCallback(
    (key: string, value: any) =>
      localStorage.setItem(key, JSON.stringify(value)),
    []
  );
  const clear = React.useCallback(() => localStorage.clear, []);

  return React.useMemo(() => ({ get, set, clear }), [clear, get, set]);
};
