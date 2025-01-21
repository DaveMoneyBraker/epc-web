import { Box, styled } from "@mui/material";
import React from "react";
import { DefaultPagination } from "./DefaultPagination";

const Wrapper = styled("div")(() => ({
  height: "var(--content-height)",
  maxHeight: "var(--content-height)",
  minHeight: "var(--content-height)",
  padding: "5px 15px 0px 15px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

interface Props {
  items: unknown[];
  totalItems: number;
  keys: string[];
  children?: React.ReactNode;
}

export const DefaultPage: React.FC<Props> = ({
  items,
  totalItems,
  keys,
  children,
}) => {
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);

  const handleChangePagination = React.useCallback(
    (newPage: number, newLimit: number) => {
      setPage(newPage);
      setLimit(newLimit);
    },
    []
  );
  return (
    <Wrapper>
      {/* <DefaultActionsRow /> */}
      <Box sx={{ flex: 1, overflow: "scroll" }}>
        {/* {!children && <DefaultTable items={items} keys={keys} />} */}
        {children && children}
      </Box>
      <DefaultPagination
        totalItems={totalItems}
        page={page}
        limit={limit}
        onChange={handleChangePagination}
      />
    </Wrapper>
  );
};
