import { usePaginationQuery } from "./usePaginationQuery";
import { useQueueQuery } from "./useQueueQuery";
import { useArrayQuery } from "./useArrayQuery";
import { useMailerPartnerArray } from "./partner";

const APP_QUERIES = {
  usePaginationQuery,
  useQueueQuery,
  useArrayQuery,
  useMailerPartnerArray,
} as const;

export default APP_QUERIES;
