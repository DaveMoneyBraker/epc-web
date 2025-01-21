import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Skeleton,
  Paper,
  TableContainer,
} from "@mui/material";
// STYLES
import "../../../styles/variables.scss";

interface TableSkeletonProps {
  rowsNum?: number;
  columnsNum?: number;
}
export const AppSkeleton: React.FC<TableSkeletonProps> = ({
  rowsNum = 11,
  columnsNum = 5,
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        backgroundColor: "var(--skeleton-background)",
        "& .MuiSkeleton-root": {
          backgroundColor: "var(--skeleton-highlight)",
        },
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {Array(columnsNum)
              .fill(null)
              .map((_, index) => (
                <TableCell key={`header-${index}`}>
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={24}
                    animation="wave"
                  />
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array(rowsNum)
            .fill(null)
            .map((_, rowIndex) => (
              <TableRow key={`row-${rowIndex}`}>
                {Array(columnsNum)
                  .fill(null)
                  .map((_, colIndex) => (
                    <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                      <Skeleton
                        variant="text"
                        width="100%"
                        height={24}
                        animation="wave"
                      />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
