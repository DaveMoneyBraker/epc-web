import React from "react";
import { useStyledDialog as dialogFunction } from "../../../2_common/dialogs";
import { DefaultDialogItemProps } from "../../../../types";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MaskItem } from "./MaskItem";
import { MaskItemInfo } from "./MaskItemInfo";
import { MaskItemExamples } from "./MaskItemExamples";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  tabIndex: number;
}

const CustomTabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, tabIndex, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={tabIndex !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
};

export const SuppressionMaskItemDialog: React.FC<
  Omit<DefaultDialogItemProps, "configs">
> = ({ open, onClose }) => {
  const Dialog = React.useMemo(() => dialogFunction(true), []);
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClose = React.useCallback(
    (confirm: boolean) => {
      confirm ? onClose({ name: "test" }) : onClose(null);
    },
    [onClose]
  );
  const [tabIndex, setTabIndex] = React.useState(2);

  const handleTabChange = React.useCallback(
    (event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue),
    [setTabIndex]
  );

  React.useEffect(() => {
    console.log({ Dialog });
  }, [Dialog]);

  // I DON'T NOW WHAT IS FOR
  // JUST COPY THE EXAMPLE FROM MUI
  const a11yProps = React.useCallback((index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }, []);

  return (
    <Dialog
      open={open}
      maxWidth="md"
      scroll="paper"
      fullWidth={true}
      PaperProps={{
        sx: {
          m: smallScreen ? 1 : 3,
          height: smallScreen ? "100%" : "auto",
          maxHeight: smallScreen ? "calc(100% - 16px)" : "95vh",
          position: "relative",
          pt: smallScreen ? 2 : 0,
        },
      }}
    >
      <DialogTitle>
        <Box
          role="toolbar"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "100%",
          }}
        >
          <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
            <Tab label="Create Mask" {...a11yProps(0)} />
            <Tab label="Info" {...a11yProps(1)} />
            <Tab label="Examples" {...a11yProps(2)} />
          </Tabs>
        </Box>
      </DialogTitle>
      <DialogContent>
        <CustomTabPanel tabIndex={tabIndex} index={0}>
          <MaskItem />
        </CustomTabPanel>
        <CustomTabPanel tabIndex={tabIndex} index={1}>
          <MaskItemInfo />
        </CustomTabPanel>
        <CustomTabPanel tabIndex={tabIndex} index={2}>
          <MaskItemExamples />
        </CustomTabPanel>
      </DialogContent>
      <DialogActions>
        <Button
          variant={theme.palette.mode === "light" ? "outlined" : "contained"}
          onClick={() => handleClose(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => handleClose(true)}
          disabled={false}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
