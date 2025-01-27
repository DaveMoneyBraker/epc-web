import { useCacheKey } from "./useCacheKey";
import { useAxiosErrorHandler } from "./useAxiosErrorHandler";
import { useRefreshToken } from "./useRefreshToken";

interface ReturnValue {
  useCacheKey: () => (config: any) => string;
  useAxiosErrorHandler: (
    refreshToken: () => Promise<void>
  ) => (error: any) => void;
  useRefreshToken: () => {
    refresh: boolean;
    refreshToken: () => Promise<void>;
  };
}

const AxiosProviderHooks: ReturnValue = {
  useCacheKey,
  useRefreshToken,
  useAxiosErrorHandler,
};

export default AxiosProviderHooks;
