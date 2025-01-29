import React from "react";
import {
  FileMapperPreviewColumn,
  TitleValueObject,
} from "../../../../../types";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { EnhancedCheckbox, EnhancedSelect } from "../../../../1_enhanced";

interface Props {
  index: number;
  column: FileMapperPreviewColumn;
  fileSkipped: boolean;
  availableHeaders: string[];
  containHeaders: boolean;
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
const DataContainer = styled(Box)(() => ({
  boxSizing: "border-box",
  height: "230px",
  maxHeight: "230px",
  padding: "15px",
  borderRadius: "10px",
}));

export const FileMapperColumn: React.FC<Props> = ({
  index,
  fileSkipped,
  column: { header, data, skip },
  containHeaders,
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

  const mapped = React.useMemo(() => Boolean(header), [header]);

  return (
    <Wrapper>
      <DataContainer
        sx={(theme) => ({
          border: `1px solid ${
            fileSkipped || skip
              ? theme.palette.text.disabled
              : mapped
              ? theme.palette.primary.main
              : theme.palette.warning.main
          }`,
        })}
      >
        <EnhancedSelect
          label={"Column Header"}
          value={colHeader as string}
          options={headerSelectValues}
          onChange={handleHeaderInputChange}
          fullWidth
          required={true}
          disabled={skip || fileSkipped}
        />
        <List
          disablePadding
          sx={{ height: "140px", maxHeight: "140px", overflowY: "scroll" }}
        >
          {data &&
            data.map((row, i) => (
              <ListItem
                key={`${row}-${i}`}
                dense
                sx={{
                  display: i === 0 && containHeaders ? "none" : "inline-block",
                }}
              >
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
        disabled={fileSkipped}
        label="Skip column"
        onChange={handleSkipColumnChange}
      />
    </Wrapper>
  );
};
