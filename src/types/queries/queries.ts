export interface QueryProps<T = any> {
  apiUrl: string;
  queryKey: string;
  query: string;
  enabled?: any;
  options?: AppQueryOptions<T>;
}

export interface AppQueryOptions<T = any> {
  transform?: (data: T[]) => T[];
  onSuccess?: (data: T[]) => void;
  onError?: (error: Error) => void;
}
