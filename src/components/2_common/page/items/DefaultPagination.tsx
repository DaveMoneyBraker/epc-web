import React from "react";
import { TablePagination } from "@mui/material";

interface Props {
  totalItems: number;
  page: number;
  limit: number;
  onChange: (page: number, limit: number) => void;
}

export const DefaultPagination: React.FC<Props> = ({
  page,
  limit,
  totalItems,
  onChange,
}) => {
  const handleChangeLimit = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newLimit = +event.target.value;
      onChange(0, newLimit);
    },
    [onChange]
  );

  const handleChangePage = React.useCallback(
    (event: unknown, newPage: number) => {
      onChange(newPage, limit);
    },
    [onChange, limit]
  );

  return (
    <TablePagination
      component="div"
      count={totalItems}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={limit}
      onRowsPerPageChange={handleChangeLimit}
    />
  );
};
