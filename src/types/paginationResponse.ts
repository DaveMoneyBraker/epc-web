export interface PaginationResponse<T = unknown> {
  totalItems: number;
  page: number;
  pageCount: number;
  items: T[];
}
