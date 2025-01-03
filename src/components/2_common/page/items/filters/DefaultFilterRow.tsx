import React from "react";
import {
  COMPARISON_OPERATORS,
  ComparisonOperatorType,
  ConditionOperatorsValues,
  DATE_COMPARISON_OPERATORS,
  DEFAULT_COMPARISON_OPERATORS,
  ENUM_COMPARISON_OPERATORS,
  FilterConfig,
  FilterItemTypes,
  FilterValue,
  NUMBER_COMPARISON_OPERATORS,
  TitleValueObject,
} from "../../../../../types";
import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AppUtils from "../../../../../utils/0_AppUtils";
import {
  EnhancedDatePicker,
  EnhancedDateRangePicker,
  EnhancedTextField,
} from "../../../../1_enhanced";

interface Props {
  filter: FilterValue;
  index: number;
  configs: FilterConfig[];
  onChange: (filter: FilterValue, index: number) => void;
  onDelete: (index: number) => void;
}

const Container = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignContent: "center",
  alignItems: "center",
  gap: "10px",
});

export const DefaultFilterRow: React.FC<Props> = ({
  filter,
  index,
  configs,
  onChange,
  onDelete,
}) => {
  const conditionOperatorOptions = React.useMemo(
    () => [...ConditionOperatorsValues],
    []
  );
  const itemType: FilterItemTypes = React.useMemo(
    () =>
      configs.find((config) => config.itemName === filter.itemName)?.itemType ||
      "string",
    [configs, filter.itemName]
  );
  const itemNameOptions: TitleValueObject[] = React.useMemo(
    () =>
      configs.map((config) => ({
        title: AppUtils.camelCaseToString(config.itemName),
        value: config.itemName,
      })),
    [configs]
  );
  const itemSelectOptions: TitleValueObject[] = React.useMemo(
    () =>
      configs.find((config) => config.itemName === filter.itemName)
        ?.selectOptions || [],
    [configs, filter.itemName]
  );
  const isRange = React.useMemo(
    () => filter.comparison === "$between",
    [filter.comparison]
  );
  const inputDisabled = React.useMemo(
    () =>
      filter.comparison === COMPARISON_OPERATORS.ISNULL ||
      filter.comparison === COMPARISON_OPERATORS.NOTNULL,
    [filter.comparison]
  );

  const getComparisonOperators = React.useCallback(
    (type: string): TitleValueObject<ComparisonOperatorType>[] => {
      if (type === "string") {
        return DEFAULT_COMPARISON_OPERATORS;
      } else if (type === "date") {
        return DATE_COMPARISON_OPERATORS;
      } else if (type === "enum") {
        return ENUM_COMPARISON_OPERATORS;
      } else if (type === "number") {
        return NUMBER_COMPARISON_OPERATORS;
      }
      return NUMBER_COMPARISON_OPERATORS;
    },
    []
  );
  const [comparisonOperatorOptions, setComparisonOperatorOptions] =
    React.useState<TitleValueObject<ComparisonOperatorType>[]>(() =>
      getComparisonOperators(
        configs.find((config) => config.itemName === filter.itemName)
          ?.itemType || "string"
      )
    );

  // IF USER CHANGE ITEM_NAME - IT MEANS ITEM_TYPE WILL PROBABLY CHANGE TO
  // SO WE NEED TO RESETS VALUE AND CHANGE COMPARISON OPERATORS
  const proceedFilterChange = React.useCallback(
    (value: unknown, key: string): FilterValue => {
      if (key === "itemName") {
        const config = configs.find((conf) => conf.itemName === value);
        const newItemType = config?.itemType || "string";
        let newValue = "";
        let newEndValue = filter.endValue;
        const newCompOp = getComparisonOperators(newItemType);
        if (newItemType === "date") {
          newValue = new Date().toISOString();
          newEndValue = new Date().toISOString();
        } else if (newItemType === "enum") {
          newValue =
            (config && config.selectOptions && config.selectOptions[0].value) ||
            "";
        }
        setComparisonOperatorOptions(newCompOp);
        return {
          ...filter,
          [key]: value as string,
          value: newValue,
          comparison: newCompOp[0].value,
          endValue: newEndValue,
        };
      }
      return { ...filter, [key]: value };
    },
    [filter, configs, getComparisonOperators, setComparisonOperatorOptions]
  );

  const handleFilterChange = React.useCallback(
    (value: unknown, key: string) => {
      const newF = proceedFilterChange(value, key);
      onChange(newF, index);
    },
    [index, onChange, proceedFilterChange]
  );

  const handleSelectChange = React.useCallback(
    (event: any, key: string) => {
      const v = event.target.value as string;
      handleFilterChange(v, key);
    },
    [handleFilterChange]
  );

  const handleDelete = React.useCallback(
    () => onDelete(index),
    [index, onDelete]
  );

  return (
    <Container>
      <FormControl fullWidth required>
        <InputLabel id={`select-input-id-${index}-condition`}>
          Condition
        </InputLabel>
        <Select
          labelId={`select-input-id-${index}-condition`}
          value={filter.condition}
          label={"Condition"}
          onChange={(e) => handleSelectChange(e, "condition")}
        >
          {conditionOperatorOptions &&
            conditionOperatorOptions.map((v, i) => (
              <MenuItem value={v.value} key={i}>
                {v.title}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl fullWidth required>
        <InputLabel id={`select-input-id-${index}-item-name`}>
          Item Name
        </InputLabel>
        <Select
          labelId={`select-input-id-${index}-item-name`}
          value={filter.itemName}
          label={"Item Name"}
          onChange={(e) => handleSelectChange(e, "itemName")}
        >
          {itemNameOptions &&
            itemNameOptions.map((v, i) => (
              <MenuItem value={v.value} key={i}>
                {v.title}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl fullWidth required>
        <InputLabel id={`select-input-id-${index}-comparison`}>
          Comparison
        </InputLabel>
        <Select
          labelId={`select-input-id-${index}-comparison`}
          value={filter.comparison}
          label={"Comparison"}
          onChange={(e) => handleSelectChange(e, "comparison")}
        >
          {comparisonOperatorOptions &&
            comparisonOperatorOptions.map((v, i) => (
              <MenuItem value={v.value} key={i}>
                {v.title}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {(itemType === "string" || itemType === "number") && (
        <EnhancedTextField
          value={filter.value}
          onChange={(v) => handleFilterChange(v, "value")}
          fullWidth
          type={itemType}
          disabled={inputDisabled}
        />
      )}

      {itemType === "enum" && itemSelectOptions && (
        <FormControl fullWidth required>
          <InputLabel id={`select-input-id-${index}-value-enum`}>
            Value
          </InputLabel>
          <Select
            labelId={`select-input-id-${index}-value-enum`}
            value={filter.value}
            label={"Value"}
            onChange={(e) => handleSelectChange(e, "value")}
            disabled={inputDisabled}
          >
            {itemSelectOptions &&
              itemSelectOptions.map((v, i) => (
                <MenuItem value={v.value} key={i}>
                  {v.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}

      {itemType === "date" &&
        filter.comparison !== COMPARISON_OPERATORS.BETWEEN && (
          <EnhancedDatePicker
            value={filter.value}
            onChange={(v) => handleFilterChange(v, "value")}
          />
        )}
      {itemType === "date" && isRange && (
        <EnhancedDateRangePicker
          startValue={filter.value}
          endValue={filter.endValue}
          onChange={handleFilterChange}
        />
      )}
      <IconButton color="error" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Container>
  );
};
