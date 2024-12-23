import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

export const MaskItemExamples: React.FC = () => {
  const createRow = React.useCallback(
    (char: string, desc: string, example: string, matches: string) => ({
      desc,
      example,
      char,
      matches,
    }),
    []
  );
  const rows = React.useMemo(
    () => [
      createRow(".", "Match any one character", "j.n", "jen, jon, j2n, j$n"),
      createRow("..", "Match any two character", "jo..", "john, josh, jo4#"),
      createRow(
        ".*",
        "Match zero or more characters",
        "sara.*",
        "sara, sarah, sarahjane, saraabc%123"
      ),
      createRow(".*", "", "s.*m.*", "sm, sam, simone, s321m$xyz"),
      createRow(
        ".+",
        "Match one or more characters",
        "sara.+",
        "sarah, sarahjane, saraabc%12"
      ),
      createRow(".+", "", "s.+m.+", "simone, s321m$xyz"),
      createRow("\\.", "Match a period", "stop\\.", "stop."),
      createRow("\\*", "Match an asterisk", "b\\*'*", "b**"),
      createRow("\\+", "Match a plus character", "18\\+", "18+"),
      createRow("\\/", "Match a forward slash", "18\\/", "18/"),
      createRow(
        "[0-9]{n}",
        "Match any numeral n times, for example, match a social security number",
        "[0-9]{3}-[0-9]{2}-[0-9]{4}",
        "123-45-6789"
      ),
    ],
    [createRow]
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Character</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Example</TableCell>
            <TableCell align="right">Matches</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ char, desc, example, matches }, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {char}
              </TableCell>
              <TableCell align="right">{desc}</TableCell>
              <TableCell align="right">{example}</TableCell>
              <TableCell align="right">{matches}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
