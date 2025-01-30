import {
  useAccountContext,
  UseAccountContext,
} from "./account/useAccountContext";
import { useAxiosContext, UseAxiosContext } from "./axios";
import { useColorModeContext, UseColorModeContext } from "./colorMode";
import {
  useCleanedNavigationContext,
  UseCleanedNavigationContext,
} from "./navigation";
import { useUiConfigContext, UseUiConfigContext } from "./uiConfig";

interface ContextHooks {
  // GET USER ACCOUNT, ROLES AND PERMISSIONS
  useAccountContext: UseAccountContext;
  // GET AXIOS INSTANCE AND LOADING STATE
  useAxiosContext: UseAxiosContext;
  // GET FUNCTION FOR TOGGLING THEME MODE
  useColorModeContext: UseColorModeContext;
  // GET CLEANED BY PERMISSIONS NAVIGATION NODES
  useCleanedNavigationContext: UseCleanedNavigationContext;
  // GET UI CONFIG OBJECT AND UPDATE FUNCTION
  useUiConfigContext: UseUiConfigContext;
}

const CONTEXT_HOOKS: ContextHooks = {
  useAccountContext,
  useAxiosContext,
  useColorModeContext,
  useCleanedNavigationContext,
  useUiConfigContext,
};

export default CONTEXT_HOOKS;
