import {
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { QueueCounts, QueueStatus } from "../../../types";

interface Props {
  selectedStatus: QueueStatus;
  counts: QueueCounts | null;
  onStatusChange: (value: QueueStatus) => void;
}

const Badge = styled(Typography)(({ theme }) => ({
  background: theme.palette.primary.main,
  fontSize: "14px",
  lineHeight: "16px",
  padding: "2px 5px",
  borderRadius: "50px",
  color: "white",
  minWidth: "40px",
}));

export const StatusBar: React.FC<Props> = ({
  counts,
  selectedStatus,
  onStatusChange,
}) => {
  const statuses = React.useMemo<QueueStatus[]>(
    () =>
      counts
        ? ["latest", ...(Object.keys(counts) as QueueStatus[])]
        : ["latest"],
    [counts]
  );

  const handleChange = React.useCallback(
    (event: React.MouseEvent<HTMLElement>, value: QueueStatus) =>
      onStatusChange(value),
    [onStatusChange]
  );

  return (
    <ToggleButtonGroup
      value={selectedStatus}
      exclusive
      onChange={handleChange}
      aria-label="text alignment"
      fullWidth
    >
      {statuses &&
        counts &&
        statuses.map((status, i) => (
          <ToggleButton
            value={status}
            key={`${status}-${i}`}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
            color="primary"
          >
            <Typography variant="body1">{status}</Typography>
            {status !== "latest" && (
              <Badge>{counts[status] && counts[status]}</Badge>
            )}
          </ToggleButton>
        ))}
    </ToggleButtonGroup>
  );
};
