import React from "react";
import { FileMapperPreviewColumn, TitleValueObject } from "../../../../types";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { EnhancedCheckbox, EnhancedSelect } from "../../../1_enhanced";

interface Props {
  index: number;
  column: FileMapperPreviewColumn;
  fileSkip: boolean;
  availableHeaders: string[];
  onColumnHeaderChange: (value: string, index: number) => void;
  onSkipColumnChange: (value: boolean, index: number) => void;
}

const Wrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "250px",
  maxWidth: "250px",
  minWidth: "250px",
  margin: "15px 5px 5px 5px",
}));
const DataContainer = styled(Box)<{ mapped: string }>(({ theme, mapped }) => ({
  boxSizing: "border-box",
  height: "230px",
  maxHeight: "230px",
  padding: "15px",
  border: `1px solid ${
    mapped ? theme.palette.info.main : theme.palette.error.main
  }`,
  borderRadius: "10px",
}));

export const FileMapperColumn: React.FC<Props> = ({
  index,
  fileSkip,
  column: { header, data, skip },
  availableHeaders,
  onColumnHeaderChange,
  onSkipColumnChange,
}) => {
  const [colHeader, setColHeader] = React.useState("");

  const headerSelectValues = React.useMemo(
    (): TitleValueObject[] =>
      availableHeaders.map((v) => ({ value: v, title: v.toUpperCase() })),
    [availableHeaders]
  );

  const handleHeaderInputChange = React.useCallback(
    (value: string) => onColumnHeaderChange(value, index),
    [index, onColumnHeaderChange]
  );

  const handleSkipColumnChange = React.useCallback(
    (value: boolean) => onSkipColumnChange(value, index),
    [index, onSkipColumnChange]
  );

  React.useEffect(() => {
    setColHeader(header);
  }, [header]);

  // IF BOOLEAN TYPE USED
  // CONSOLE SHOW ERROR THAT PROP 'MAPPED' MUST BE STRING
  const mapped = React.useMemo(
    () => (skip || header ? "true" : ""),
    [header, skip]
  );

  return (
    <Wrapper>
      <DataContainer mapped={mapped}>
        <EnhancedSelect
          label={"Column Header"}
          value={colHeader as string}
          options={headerSelectValues}
          onChange={handleHeaderInputChange}
          fullWidth
          required={true}
          disabled={skip || fileSkip}
        />
        <List
          disablePadding
          sx={{ height: "140px", maxHeight: "140px", overflowY: "scroll" }}
        >
          {data &&
            data.map((row, i) => (
              <ListItem key={i} dense>
                <ListItemText
                  disableTypography={true}
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
        </List>
      </DataContainer>
      <EnhancedCheckbox
        value={skip}
        disabled={fileSkip}
        label="Skip column"
        onChange={handleSkipColumnChange}
      />
    </Wrapper>
  );
};
