import {
  Autocomplete,
  AutocompleteProps,
  createFilterOptions,
  FormControl,
  TextField,
} from "@mui/material";
import React from "react";
import { SelectOption } from "../../types";
import CONTEXT_HOOKS from "../../providers/0_ContextHooks";

type Props = Omit<
  AutocompleteProps<SelectOption, boolean | undefined, boolean, boolean>,
  "onChange" | "renderInput"
> & {
  value: string;
  required?: boolean;
  label?: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

export const EnhancedAutocomplete: React.FC<Props> = ({
  value: propValue,
  label = "value",
  fullWidth = true,
  required = true,
  options,
  onChange,
}) => {
  const {
    config: { inputSize },
  } = CONTEXT_HOOKS.useUiConfigContext();
  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === propValue) || null,
    [options, propValue]
  );
  const [inputValue, setInputValue] = React.useState<string>(
    selectedOption?.title || ""
  );

  const handleChange = React.useCallback(
    (event: any, newValue: SelectOption | null) => {
      onChange(newValue?.value || "");
    },
    [onChange]
  );
  const handleInputChange = React.useCallback(
    (event: any, newValue: string | null) => setInputValue(newValue || ""),
    []
  );
  const filterOptions = createFilterOptions({
    stringify: (option: SelectOption) => option.title,
  });

  React.useEffect(() => {
    setInputValue(selectedOption?.title || "");
  }, [selectedOption]);

  return (
    <FormControl fullWidth={fullWidth} required={required}>
      <Autocomplete
        disablePortal
        size={inputSize}
        fullWidth={fullWidth}
        filterOptions={filterOptions}
        getOptionLabel={(option) => option.title}
        isOptionEqualToValue={(option) =>
          option.value === selectedOption?.value
        }
        value={selectedOption}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        id="controllable-states-demo"
        options={options}
        renderInput={(params) => (
          <TextField {...params} size={inputSize} label={label} />
        )}
      />
    </FormControl>
  );
};
