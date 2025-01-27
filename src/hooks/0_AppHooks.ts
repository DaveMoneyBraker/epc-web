import { useNotification, UseNotification } from "./useNotifications";
import { useLocalStorage, UseLocalStorage } from "./useLocalStorage";
import { useApiUrlLoader, UseApiUrlLoader } from "./useApiLoader";
import { useInApp, UseInApp } from "./useInApp";
import { useAuth, UseAuth } from "./useAuth";
import {
  useFilteredByPermissionsActions,
  UseFilteredByPermissionsActions,
} from "./useFilteredByPermissionsActions";
import {
  useDefaultPageState,
  UseDefaultPageState,
} from "./useDefaultPageState";
import {
  useInputChangeHandler,
  UseInputChangeHandler,
} from "./useInputChangeHandler";
import {
  useFilteredItemConfigs,
  UseFilteredItemConfigs,
} from "./useFilteredItemConfigs";
import {
  useEPCDocumentTitle,
  UseEPCDocumentTitle,
} from "./useEPCDocumentTitle";
import { useIsOnline, UseIsOnline } from "./useIsOnline";
import { useThemePalette, UseThemePalette } from "./useThemePalette";
import { useIsAdmin, UseIsAdmin } from "./useIsAdmin";
import {
  useAxiosResponseValidator,
  UseAxiosResponseValidator,
} from "./useAxiosResponseValidator";
import {
  useInitialDataLoaded,
  UseInitialDataLoaded,
} from "./useInitialDataLoaded";
import { useUserFullName, UseUserFullName } from "./useUserFullName";
import {
  useFirstPageLoading,
  UseFirstPageLoading,
} from "./useFirstPageLoading";
import { useDebounce, UseDebounce } from "./useDebounce";
import {
  useCleanedPagesInfo,
  UseCleanedPagesInfo,
} from "./useCleanedPagesInfo";

interface AppHooksInterface {
  // LOADING API URL FROM ASSETS FOLDER
  useApiUrlLoader: UseApiUrlLoader;
  // FUNCTION FOR SHOWING NOTIFICATION
  useNotification: UseNotification;
  // FUNCTIONS FOR MAINTAINING DATA IN LOCAL STORAGE
  useLocalStorage: UseLocalStorage;
  // CHECKING IS USER IN pages/ ROUTES
  useInApp: UseInApp;
  // AUTH RELATED FUNCTIONS
  useAuth: UseAuth;
  // TABLE ACTIONS FILTERED BY USER'S PERMISSIONS
  useFilteredByPermissionsActions: UseFilteredByPermissionsActions;
  // CONTROLS OF DEFAULT TABLE PAGE
  useDefaultPageState: UseDefaultPageState;
  // DEFAULT INPUT HANDLER
  useInputChangeHandler: UseInputChangeHandler;
  // CREATING ITEMS CONFIG FOR DEFAULT PAGE FROM FILTERS CONFIGS
  useFilteredItemConfigs: UseFilteredItemConfigs;
  // SETUP EPC HUB PAGE TITLE
  useEPCDocumentTitle: UseEPCDocumentTitle;
  // CHECK IS USER HAVE NETWORK CONNECTION
  useIsOnline: UseIsOnline;
  // GET MUI THEME PALETTE
  useThemePalette: UseThemePalette;
  // CHECK IS USER HAVE ADMIN OR DEVELOPER ROLE
  useIsAdmin: UseIsAdmin;
  // BASIC AXIOS RESPONSE VALIDATOR
  useAxiosResponseValidator: UseAxiosResponseValidator;
  // CHECK IS USER BASIC INFO LOADED - ACCOUNT, ROLES, PERMISSIONS
  useInitialDataLoaded: UseInitialDataLoaded;
  // GET USER FULL NAME FROM USER ACCOUNT
  useUserFullName: UseUserFullName;
  // CHECK IS IT FIRST PAGE LOADING
  useFirstPageLoading: UseFirstPageLoading;
  // FUNCTION THAT MAKE DEBOUNCE VALUE CHANGE
  useDebounce: UseDebounce;
  // FUNCTION THAT GET BACK INFO ABOUT ONLY ALLOWED TO USER PAGES
  useCleanedPagesInfo: UseCleanedPagesInfo;
}

const APP_HOOKS: AppHooksInterface = {
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
  useThemePalette,
  useIsAdmin,
  useAxiosResponseValidator,
  useInitialDataLoaded,
  useUserFullName,
  useFirstPageLoading,
  useDebounce,
  useCleanedPagesInfo,
} as const;

export default APP_HOOKS;
