import { useAccountContext } from "./account/useAccountContext";
import { useAxiosContext } from "./axios";
import { useColorModeContext } from "./colorMode";
import { useCleanedNavigationContext } from "./navigation";

const ContextHooks = {
  useAccountContext,
  useAxiosContext,
  useColorModeContext,
  useCleanedNavigationContext,
};

export default ContextHooks;
