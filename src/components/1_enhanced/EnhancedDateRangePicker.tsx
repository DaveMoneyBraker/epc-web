import React from "react";
import { Box, styled } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import APP_UTILS from "../../utils/0_AppUtils";
import CONTEXT_HOOKS from "../../providers/0_ContextHooks";

interface Props {
  startValue: string;
  endValue: string;
  onChange: (value: string, key: string) => void;
}

const Wrapper = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: "5px",
});

export const EnhancedDateRangePicker: React.FC<Props> = ({
  startValue,
  endValue,
  onChange,
}) => {
  const {
    config: { inputSize },
  } = CONTEXT_HOOKS.useUiConfigContext();
  const [start, setStart] = React.useState<Dayjs>(dayjs(new Date(startValue)));
  const [end, setEnd] = React.useState<Dayjs>(dayjs(new Date(endValue)));

  // VALUE COULD BE NULL OR UNDEFINED IN CASE WE USE CLEAR VALUE FUNCTION FROM DATE PICKER
  // AS SOON WE DON'T - ALL TYPE CHECKS ONLY FOR IDE
  const handleStartChange = React.useCallback(
    (v: Dayjs | null) => {
      const formattedValue = APP_UTILS.setDayjsHours(v as Dayjs);
      setStart(formattedValue);
      const date = formattedValue?.toDate().toISOString();
      onChange(date || "", "value");
    },
    [setStart, onChange]
  );

  // SAME SITUATION AS WITH FUNCTION ABOVE
  const handleEndChange = React.useCallback(
    (v: Dayjs | null) => {
      const formattedValue = APP_UTILS.setDayjsHours(v as Dayjs, 24);
      setEnd(formattedValue);
      const date = formattedValue?.toDate().toISOString();
      onChange(date || "", "endValue");
    },
    [setEnd, onChange]
  );

  return (
    <Wrapper>
      <DatePicker
        label="Start"
        value={start}
        onChange={handleStartChange}
        maxDate={end}
        slotProps={{
          textField: {
            size: inputSize,
          },
        }}
      />
      <DatePicker
        label="End"
        value={end}
        onChange={handleEndChange}
        minDate={start}
        slotProps={{
          textField: {
            size: inputSize,
          },
        }}
      />
    </Wrapper>
  );
};
