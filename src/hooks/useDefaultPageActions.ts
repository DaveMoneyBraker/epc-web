import React from "react";
import APP_CONSTANTS from "../constants/0_AppConstants";
import { DefaultPageActions } from "../types";

export type UseDefaultPageActions = () => DefaultPageActions[];

export const useDefaultPageActions: UseDefaultPageActions = () =>
  React.useMemo(
    () => [
      APP_CONSTANTS.PAGE_ACTIONS.CREATE,
      APP_CONSTANTS.PAGE_ACTIONS.EDIT,
      APP_CONSTANTS.PAGE_ACTIONS.SUBMIT,
      APP_CONSTANTS.PAGE_ACTIONS.DELETE,
    ],
    []
  );
