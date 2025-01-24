import {
  List,
  ListItem,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import React from "react";

const StyledList = styled(List)(
  () => `
  &.MuiList-root {
    
  .MuiListItem-root:not(:last-child) {
      border-bottom: 1px solid lightgray;
    }
  }
`
);

interface MaskInfo {
  symbol: string;
  name: string;
  text: string;
}

export const MaskItemInfo: React.FC = () => {
  const maskInfo: MaskInfo[] = React.useMemo(
    () => [
      {
        symbol: ".",
        name: "Period",
        text: "Matches any single character of the input sequence",
      },
      {
        symbol: "^",
        name: "Circumflex",
        text: "Represents the beginning of the input line. For example, ^A is a regular expression that matches the letter A at the beginning of a line. The ^ character is the only special character allowed at the beginning of a regular expression or after the ( or | characters.",
      },
      {
        symbol: "$",
        name: "Dollar sign",
        text: "Represents the end of the input line. For example, A$ is a regular expression that matches the letter A at the end of a line. The $character is the only special character allowed at the end of a regular expression or before the ) or | characters.",
      },
      {
        symbol: "*",
        name: "Asterisk",
        text: "Matches zero or more instances of the string to the immediate left of the asterisk. For example, A* matches A, AA, AAA, and so on. It also matches the null string (zero occurrences of A).",
      },
      {
        symbol: "?",
        name: "Question mark",
        text: "Matches zero or one instance of the string to the immediate left of the question mark.",
      },
      {
        symbol: "+",
        name: "Plus sign",
        text: "Matches one or more instances of the string to the immediate left of the plus sign.",
      },
      {
        symbol: "\\",
        name: "Escape",
        text: "Turns on or off the special meaning of metacharacters. For example, \\. only matches a dot character. \\$ matches a literal dollar sign character. Note that \\ matches a literal character.",
      },
      {
        symbol: "|",
        name: "Pipe",
        text: "Matches either expression on either side of the pipe. For example, exe|com|zip matches exe, com, or zip.",
      },
      {
        symbol: "[] or \\(\\)",
        name: "Brackets",
        text: "Inside the brackets, matches a single character or collating element, as in a list. Characters within brackets are not case sensitive.The string inside the brackets is evaluated literally, as if an escape character () were placed before each character in the string.If the initial character in the bracket is a circumflex (^), then the expression matches any character or collating element except those inside the bracket expression.If the first character after any potential circumflex (^) is a dash (-) or a closing bracket (]), then that character matches only a literal dash or closing bracket.",
      },
    ],
    []
  );
  return (
    <StyledList>
      {maskInfo.map(({ symbol, name, text }, index) => (
        <ListItem
          secondaryAction={<Typography variant="body2">{symbol}</Typography>}
          key={`mask-item-info-${index}`}
        >
          <ListItemText>
            <Typography variant="body2" width={"95%"}>
              <strong>{name}</strong>: {text}
            </Typography>
          </ListItemText>
        </ListItem>
      ))}
    </StyledList>
  );
};
