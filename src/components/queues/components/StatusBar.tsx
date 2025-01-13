import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";
import { QueueCounts, QueueStatus } from "../types";

interface Props {
  selectedStatus: QueueStatus;
  counts: QueueCounts | null;
  onStatusChange: (value: QueueStatus) => void;
}

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
        statuses.map((status) => (
          <ToggleButton
            value={status}
            key={status}
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
            color="primary"
          >
            <Typography variant="body1">{status}</Typography>
            {status !== "latest" && counts[status] > 0 && (
              <Typography variant="queueStats">
                ({counts[status] > 100 ? "100+" : counts[status]})
              </Typography>
            )}
          </ToggleButton>
        ))}
    </ToggleButtonGroup>
  );
};
