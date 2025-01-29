import React from "react";
import {
  ComparisonOperator,
  FilterConfig,
  FilterItemType,
  FilterValue,
  TitleValueObject,
} from "../../../../../../types";
import { Box, IconButton, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AppUtils from "../../../../../../utils/0_AppUtils";
import {
  EnhancedDatePicker,
  EnhancedDateRangePicker,
  EnhancedSelect,
  EnhancedTextField,
} from "../../../../../1_enhanced";
import APP_CONSTANTS from "../../../../../../constants/0_AppConstants";

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
    () => [...APP_CONSTANTS.CONDITIONS_OPERATOR_VALUES],
    []
  );
  const itemType: FilterItemType = React.useMemo(
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
      filter.comparison === APP_CONSTANTS.COMPARISON_OPERATORS.ISNULL ||
      filter.comparison === APP_CONSTANTS.COMPARISON_OPERATORS.NOTNULL,
    [filter.comparison]
  );

  const getComparisonOperators = React.useCallback(
    (type: string): TitleValueObject<ComparisonOperator>[] => {
      if (type === "string") {
        return APP_CONSTANTS.DEFAULT_COMPARISON_OPERATORS;
      } else if (type === "date") {
        return APP_CONSTANTS.DATE_COMPARISON_OPERATORS;
      } else if (type === "enum") {
        return APP_CONSTANTS.ENUM_COMPARISON_OPERATORS;
      } else if (type === "number") {
        return APP_CONSTANTS.NUMBER_COMPARISON_OPERATORS;
      }
      return APP_CONSTANTS.DEFAULT_COMPARISON_OPERATORS;
    },
    []
  );
  const [comparisonOperatorOptions, setComparisonOperatorOptions] =
    React.useState<TitleValueObject<ComparisonOperator>[]>(() =>
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

  const handleDelete = React.useCallback(
    () => onDelete(index),
    [index, onDelete]
  );

  return (
    <Container>
      <EnhancedSelect
        required
        label="Condition"
        value={filter.condition}
        options={conditionOperatorOptions}
        onChange={(v) => handleFilterChange(v, "condition")}
      />

      <EnhancedSelect
        required
        label="Item Name"
        value={filter.itemName}
        options={itemNameOptions}
        onChange={(v) => handleFilterChange(v, "itemName")}
      />

      <EnhancedSelect
        required
        label="Comparison"
        value={filter.comparison}
        options={comparisonOperatorOptions}
        onChange={(v) => handleFilterChange(v, "comparison")}
      />

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
        <EnhancedSelect
          required
          label="Value"
          value={filter.value}
          options={itemSelectOptions}
          onChange={(v) => handleFilterChange(v, "value")}
          disabled={inputDisabled}
        />
      )}

      {itemType === "date" &&
        filter.comparison !== APP_CONSTANTS.COMPARISON_OPERATORS.BETWEEN && (
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
