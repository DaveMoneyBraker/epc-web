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

interface ContextHooks {
  // GET USER ACCOUNT, ROLES AND PERMISSIONS
  useAccountContext: UseAccountContext;
  // GET AXIOS INSTANCE AND LOADING STATE
  useAxiosContext: UseAxiosContext;
  // GET FUNCTION FOR TOGGLING THEME MODE
  useColorModeContext: UseColorModeContext;
  // GET CLEANED BY PERMISSIONS NAVIGATION NODES
  useCleanedNavigationContext: UseCleanedNavigationContext;
}

const CONTEXT_HOOKS: ContextHooks = {
  useAccountContext,
  useAxiosContext,
  useColorModeContext,
  useCleanedNavigationContext,
};

export default CONTEXT_HOOKS;
