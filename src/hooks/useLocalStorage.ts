import React from "react";

export type UseLocalStorage = <T>() => {
  get: Get<T>;
  set: (key: string, value: any) => void;
  clear: () => void;
};

type Get<T> = (key: string) => T;

export const useLocalStorage: UseLocalStorage = <T = unknown>() => {
  const get = React.useCallback<Get<T>>((key: string) => {
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
