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
> = ({ title, open, onClose }) => {
  const Dialog = React.useMemo(() => dialogFunction(true), []);
  const theme = useTheme();
  const handleClose = React.useCallback(
    (confirm: boolean) => {
      confirm ? onClose({ name: "test" }) : onClose(null);
    },
    [onClose]
  );
  const [tabIndex, setTabIndex] = React.useState(0);

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
    <Dialog open={open} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
          <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
            <Tab label="Create Mask" {...a11yProps(0)} />
            <Tab label="Info" {...a11yProps(1)} />
            <Tab label="Examples" {...a11yProps(2)} />
          </Tabs>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%", padding: "0 20px" }}>
          <CustomTabPanel tabIndex={tabIndex} index={0}>
            <MaskItem />
          </CustomTabPanel>
          <CustomTabPanel tabIndex={tabIndex} index={1}>
            <MaskItemInfo />
          </CustomTabPanel>
          <CustomTabPanel tabIndex={tabIndex} index={2}>
            <MaskItemExamples />
          </CustomTabPanel>
        </Box>
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
