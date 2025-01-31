import { getInputValue } from "./getInputValue";
import { getErrorMessage } from "./getErrorMessage";
import * as checks from "./checks";
import { getLastPartOfString } from "./getLastPartOfString";
import { camelToTitleCase } from "./camelToTitleCase";
import { camelCaseToString } from "./camelCaseToString";
import { setDayjsHours } from "./setDayjsHours";
import { toTitleCase } from "./toTitleCase";
import { getFileSize } from "./getFileSize";
import { formatDate } from "./formatDate";
import { downloadFile } from "./downloadFile";
import { addIndexRedirects } from "./addIndexRedirects";
import { getUniqueId } from "./getUniqueId";

const APP_UTILS = {
  getInputValue,
  checks,
  getErrorMessage,
  getLastPartOfString,
  camelToTitleCase,
  camelCaseToString,
  setDayjsHours,
  toTitleCase,
  getFileSize,
  formatDate,
  downloadFile,
  addIndexRedirects,
  getUniqueId,
} as const;

export default APP_UTILS;
