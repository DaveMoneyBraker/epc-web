import { useAxios } from "./useAxios";
import { useNotification } from "./useNotifications";
import { useLocalStorage } from "./useLocalStorage";
import { useApiUrlLoader } from "./useApiLoader";
import { useInApp } from "./useInApp";
import { useAuth } from "./useAuth";
import { useFilteredByPermissionsActions } from "./useFilteredByPermissionsActions";
import { useDefaultPageState } from "./useDefaultPageState";
import { useInputChangeHandler } from "./useInputChangeHandler";
import { useFilteredItemConfigs } from "./useFilteredItemConfigs";
import { useEPCDocumentTitle } from "./useEPCDocumentTitle";
import { useIsOnline } from "./useIsOnline";

const AppHooks = {
  useAxios,
  useNotification,
  useLocalStorage,
  useApiUrlLoader,
  useInApp,
  useAuth,
  useFilteredByPermissionsActions,
  useDefaultPageState,
  useInputChangeHandler,
  useFilteredItemConfigs,
  useEPCDocumentTitle,
  useIsOnline,
} as const;

export default AppHooks;
