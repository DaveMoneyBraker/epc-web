import React from "react";

export const useInputChangeHandler = (
  setter: React.Dispatch<React.SetStateAction<any>> | ((v: unknown) => void)
) => {
  const handler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value },
      } = event;
      setter(value);
    },
    [setter]
  );
  return handler;
};
