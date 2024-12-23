import { getInputValue } from "./getInputValue";
import { getErrorMessage } from "./getErrorMessage";
import * as checks from "./checks";
import { getLastPartOfString } from "./getLastPartOfString";
import { camelToTitleCase } from "./camelToTitleCase";
import { camelCaseToString } from "./camelCaseToString";
import { setDayjsHours } from "./setDayjsHours";
import { toTitleCase } from "./toTitleCase";

const AppUtils = {
  getInputValue,
  checks,
  getErrorMessage,
  getLastPartOfString,
  camelToTitleCase,
  camelCaseToString,
  setDayjsHours,
  toTitleCase,
} as const;

export default AppUtils;
