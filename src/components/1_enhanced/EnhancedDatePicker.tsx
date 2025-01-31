import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import APP_UTILS from "../../utils/0_AppUtils";

interface Props {
  value: string;
  label?: string;
  onChange: (v: string) => void;
}

export const EnhancedDatePicker: React.FC<Props> = ({
  value,
  label = "Date",
  onChange,
}) => {
  const [start, setStart] = React.useState<Dayjs | null>(
    dayjs(new Date(value))
  );

  // VALUE COULD BE NULL OR UNDEFINED IN CASE WE USE CLEAR VALUE FUNCTION FROM DATE PICKER
  // AS SOON WE DON'T - ALL TYPE CHECKS ONLY FOR IDE
  const handleChange = React.useCallback(
    (v: Dayjs | null) => {
      const formattedValue = APP_UTILS.setDayjsHours(v as Dayjs);
      setStart(formattedValue);
      const date = formattedValue?.toDate().toISOString();
      onChange(date || "");
    },
    [onChange]
  );

  return (
    <DatePicker
      label={label}
      value={start}
      onChange={handleChange}
      sx={{ width: "100%" }}
    />
  );
};
