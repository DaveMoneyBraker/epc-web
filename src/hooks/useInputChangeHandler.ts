import React from "react";

export type UseInputChangeHandler = (
  setter: React.Dispatch<React.SetStateAction<any>> | ((v: unknown) => void)
) => (event: React.ChangeEvent<HTMLInputElement>) => void;

export const useInputChangeHandler: UseInputChangeHandler = (
  setter: React.Dispatch<React.SetStateAction<any>> | ((v: unknown) => void)
) =>
  React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value },
      } = event;
      setter(value);
    },
    [setter]
  );
