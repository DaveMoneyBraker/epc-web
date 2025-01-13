import { Box, styled } from "@mui/material";
import React from "react";
import { ActionsPanel } from "./ActionsPanel";
import { ServerStats } from "./ServerStats";
import { QueueStats, QueueStatus } from "../../types";

type Action = "retry" | "delete" | "refresh";

interface Props {
  stats: QueueStats | null;
  status: QueueStatus;
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

export const QueueTopBar: React.FC<Props> = ({ stats, status, onAction }) => {
  const showActions = React.useMemo(
    () =>
      status !== "latest" &&
      stats &&
      Object.values(stats).some((stat) => +stat > 0),
    [status, stats]
  );
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
      {showActions && <ActionsPanel status={status} onAction={handleAction} />}
      <ServerStats stats={stats} />
    </Wrapper>
  );
};
