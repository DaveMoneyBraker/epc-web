import { TablePagination } from "@mui/material";
import React from "react";

interface Props {
  count: number;
  page: number;
  rowsPerPage?: number;
  onPageChange: (value: number) => void;
  onRowsPerPageChange?: (value: number) => void;
}

export const AppPagination: React.FC<Props> = ({
  count,
  page,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const handlePageChange = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) =>
      onPageChange(newPage),
    [onPageChange]
  );
  const handleRowsPerPageChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = parseInt(event.target.value, 10);
      onRowsPerPageChange && onRowsPerPageChange(newValue);
      onPageChange(0);
    },
    [onPageChange, onRowsPerPageChange]
  );
  const rowsPerPageOptions = React.useMemo(
    () => (onRowsPerPageChange ? [10, 25, 50, 100] : []),
    [onRowsPerPageChange]
  );
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handlePageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleRowsPerPageChange}
      rowsPerPageOptions={rowsPerPageOptions}
    />
  );
};