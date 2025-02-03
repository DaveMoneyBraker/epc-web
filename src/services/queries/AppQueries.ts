import { usePaginationQuery } from "./usePaginationQuery";
import { useQueueQuery } from "./useQueueQuery";
import { useArrayQuery } from "./useArrayQuery";

const AppQueries = {
  usePaginationQuery,
  useQueueQuery,
  useArrayQuery,
} as const;

export default AppQueries;
