import React from "react";
import { useStyledDialog as dialogFunction } from "../../../2_common/dialogs";
import {
  DefaultDialogItemProps,
  SUPPRESSION_TYPES,
  SuppressionMask,
  SuppressionType,
} from "../../../../types";
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
import { EnhancedButton } from "../../../1_enhanced";

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
  Omit<DefaultDialogItemProps<SuppressionMask>, "configs">
> = ({ open, onClose, selectedItem }) => {
  // ITEM
  const [name, setName] = React.useState("");
  const [mask, setMask] = React.useState("");
  const [valid, setValid] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [type, setType] = React.useState<SuppressionType>(
    SUPPRESSION_TYPES.MANUAL
  );
  const [test, setTest] = React.useState("");
  const [testStatus, setTestStatus] = React.useState<
    null | "valid" | "invalid"
  >(null);
  // DIALOG
  const Dialog = React.useMemo(() => dialogFunction(true), []);
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClose = React.useCallback(
    (confirm: boolean) => {
      if (!confirm) {
        onClose(null);
      } else {
        const body = selectedItem
          ? { ...selectedItem, name, type, mask }
          : { name, type, mask };
        onClose(body);
      }
    },
    [selectedItem, type, mask, name, onClose]
  );
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = React.useCallback(
    (event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue),
    [setTabIndex]
  );

  React.useEffect(() => {
    if (selectedItem && open) {
      const { name, type, mask } = selectedItem;
      setName(name);
      setMask(mask);
      setType(type);
    }
    if (!open) {
      setName("");
      setMask("");
    }
  }, [selectedItem, open]);

  React.useEffect(() => {
    setErrorMessage("");
    setTestStatus(null);
    setValid(true);
    try {
      const regExp = new RegExp(mask);
      const v = regExp.test(test);
      setTestStatus(v ? "valid" : "invalid");
      setValid(true);
    } catch (error: any) {
      setErrorMessage(error.message || "Unhandled Error :(");
      setTestStatus("invalid");
      setValid(false);
    }
  }, [test, mask]);

  // I DON'T NOW WHAT IS FOR
  // JUST COPY THE EXAMPLE FROM MUI
  const a11yProps = React.useCallback((index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }, []);

  const handleItemChange = React.useCallback(
    (key: string, value: any) => {
      if (key === "name") {
        setName(value);
      }
      if (key === "mask") {
        setMask(value);
      }
      if (key === "type") {
        setType(value);
      }
      if (key === "test") {
        setTest(value);
      }
    },
    [setName, setMask, setType]
  );

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
          <MaskItem
            name={name}
            mask={mask}
            valid={valid}
            errorMessage={errorMessage}
            type={type}
            test={test}
            testStatus={testStatus}
            onChange={handleItemChange}
          />
        </CustomTabPanel>
        <CustomTabPanel tabIndex={tabIndex} index={1}>
          <MaskItemInfo />
        </CustomTabPanel>
        <CustomTabPanel tabIndex={tabIndex} index={2}>
          <MaskItemExamples />
        </CustomTabPanel>
      </DialogContent>
      <DialogActions>
        <EnhancedButton
          variant={theme.palette.mode === "light" ? "outlined" : "contained"}
          onClick={() => handleClose(false)}
        >
          Cancel
        </EnhancedButton>
        <EnhancedButton
          onClick={() => handleClose(true)}
          disabled={!name || !mask || !type || !valid}
        >
          Submit
        </EnhancedButton>
      </DialogActions>
    </Dialog>
  );
};
