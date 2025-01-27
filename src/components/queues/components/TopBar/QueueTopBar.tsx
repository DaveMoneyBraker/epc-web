import { Box, styled } from "@mui/material";
import React from "react";
import { ActionsPanel } from "./ActionsPanel";
import { ServerStats } from "./ServerStats";
import { QueueCounts, QueueStats, QueueStatus } from "../../../../types";

type Action = "retry" | "delete" | "refresh";

interface Props {
  stats: QueueStats | null;
  status: QueueStatus;
  counts: QueueCounts | null;
  onAction: (action: Action) => void;
}

const Wrapper = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "20px",
  padding: "8px 16px",
  minHeight: "53px",
});

export const QueueTopBar: React.FC<Props> = ({
  stats,
  status,
  counts,
  onAction,
}) => {
  const showActions = React.useMemo(() => status !== "latest", [status]);

  const handleAction = React.useCallback(
    (action: Action) => onAction(action),
    [onAction]
  );
  return (
    <Wrapper
      sx={{
        justifyContent: showActions ? "space-between" : "flex-end",
      }}
    >
      {showActions && (
        <ActionsPanel status={status} counts={counts} onAction={handleAction} />
      )}
      <ServerStats stats={stats} />
    </Wrapper>
  );
};
