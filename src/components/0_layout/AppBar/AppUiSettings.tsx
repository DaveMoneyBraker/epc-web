import React from "react";
import { EnhancedIconButton, EnhancedSelect } from "../../1_enhanced";
import SettingsIcon from "@mui/icons-material/Settings";
import { DialogWrapper } from "../../3_shared/dialogs";
import CONTEXT_HOOKS from "../../../providers/0_ContextHooks";
import APP_CONSTANTS from "../../../constants/0_AppConstants";
import { UiConfig } from "../../../types";
import { Box } from "@mui/material";

export const AppUiSettings: React.FC = () => {
  const { config: uiConfig, updateConfig } = CONTEXT_HOOKS.useUiConfigContext();
  const [state, setState] = React.useState({ ...uiConfig });
  const [open, setOpen] = React.useState(false);
  const elementSizeOptions = React.useMemo(
    () => APP_CONSTANTS.UI_ELEMENT_SIZE_OPTIONS,
    []
  );
  const fontSizeOptions = React.useMemo(
    () => APP_CONSTANTS.UI_FONT_SIZE_OPTIONS,
    []
  );
  const iconFontSizeOptions = React.useMemo(
    () => APP_CONSTANTS.UI_ICON_FONT_SIZE_OPTIONS,
    []
  );
  const tableDensityOptions = React.useMemo(
    () => APP_CONSTANTS.UI_TABLE_DENSITY_OPTIONS,
    []
  );
  const toggleOpen = React.useCallback(() => setOpen((prev) => !prev), []);
  const handleClose = React.useCallback(
    (confirm: boolean) => {
      if (confirm) {
        updateConfig(state);
      }
      toggleOpen();
    },
    [state, toggleOpen, updateConfig]
  );

  const handleChange = React.useCallback(
    (value: string | number, key: keyof typeof state) => {
      const enwState = { ...state, [key]: value } as UiConfig;
      setState(enwState);
    },
    [state, setState]
  );

  React.useEffect(() => {
    setState({ ...uiConfig });
  }, [uiConfig]);

  return (
    <React.Fragment>
      <EnhancedIconButton
        icon={SettingsIcon}
        sx={{ color: "white" }}
        onClick={toggleOpen}
      />
      <DialogWrapper
        open={open}
        onClose={handleClose}
        title="UI Settings"
        disabled={false}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <EnhancedSelect
            required
            label="Buttons Size"
            value={state.buttonSize}
            options={elementSizeOptions}
            onChange={(v) => handleChange(v, "buttonSize")}
          />
          <EnhancedSelect<number>
            required
            label="Icons Font Size"
            value={state.iconFontSize}
            options={iconFontSizeOptions}
            onChange={(v) => handleChange(v, "iconFontSize")}
          />
          <EnhancedSelect
            required
            label="Table Density"
            value={state.tableDensity}
            options={tableDensityOptions}
            onChange={(v) => handleChange(v, "tableDensity")}
          />
          <EnhancedSelect<number>
            required
            label="Table Font Size"
            value={state.tableFontSize}
            options={fontSizeOptions}
            onChange={(v) => handleChange(v, "tableFontSize")}
          />
        </Box>
      </DialogWrapper>
    </React.Fragment>
  );
};
