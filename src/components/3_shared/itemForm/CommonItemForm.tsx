import React from "react";
import { ItemErrorValue, ItemDialogValue } from "../../../types";
import APP_CONSTANTS from "../../../constants/0_AppConstants";
import { EnhancedSelect, EnhancedTextFieldWithErrors } from "../../1_enhanced";

interface Props {
  state: ItemDialogValue[];
  errorState: ItemErrorValue[];
  onChange: (value: unknown, i: number) => void;
}

export const CommonItemForm: React.FC<Props> = ({
  state,
  errorState,
  onChange,
}) => {
  const handleInputChange = React.useCallback(
    (value: unknown, i: number) => onChange(value, i),
    [onChange]
  );
  return (
    <React.Fragment>
      {state &&
        state.map(
          ({ key, itemType, value, selectOptions, required = true }, i) => {
            if (
              itemType === APP_CONSTANTS.FILTER_ITEM_TYPE.STRING ||
              itemType === APP_CONSTANTS.FILTER_ITEM_TYPE.NUMBER
            ) {
              const err = errorState.find((e) => e.key === key);
              return (
                <EnhancedTextFieldWithErrors
                  key={`${key}-${itemType}-${i}`}
                  label={key}
                  value={value as string}
                  onChange={(v) => handleInputChange(v, i)}
                  fullWidth
                  type={itemType}
                  required={required}
                  errorState={err}
                />
              );
            }
            // FOR ENUM TYPE WE USE SELECT_INPUT ELEMENT
            // SO THERE IS NO POSSIBILITY FOR USER TO MAKE ERROR
            if (
              itemType === APP_CONSTANTS.FILTER_ITEM_TYPE.ENUM &&
              selectOptions
            ) {
              return (
                <EnhancedSelect
                  label={key}
                  value={value as string}
                  options={selectOptions}
                  onChange={(v) => handleInputChange(v, i)}
                  fullWidth
                  required={required}
                  key={`${key}-${itemType}-${i}`}
                />
              );
            }
            return <React.Fragment />;
          }
        )}
    </React.Fragment>
  );
};
