import React from "react";
import { Box } from "@mui/material";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import styled from "styled-components";
import { EnhancedButton } from "../../../1_enhanced";
import { QueueCounts, QueueStatus } from "../../../../types";

type Action = "retry" | "delete" | "refresh";

interface Props {
  status: QueueStatus;
  counts: QueueCounts | null;
  onAction: (action: Action) => void;
}

const Wrapper = styled(Box)({
  width: "50%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

export const ActionsPanel: React.FC<Props> = ({ status, counts, onAction }) => {
  const handleAction = React.useCallback(
    (action: Action) => onAction(action),
    [onAction]
  );

  const disabled = React.useMemo(
    () => !counts || counts[status] === 0,
    [counts, status]
  );

  return (
    <Wrapper>
      <EnhancedButton
        variant="outlined"
        startIcon={<CachedOutlinedIcon />}
        onClick={() => handleAction("refresh")}
        disabled={disabled}
      >
        refresh data
      </EnhancedButton>
      {status === "failed" && (
        <EnhancedButton
          variant="outlined"
          color="warning"
          startIcon={<ReplayOutlinedIcon />}
          onClick={() => handleAction("retry")}
          disabled={disabled}
        >
          retry all jobs
        </EnhancedButton>
      )}
      <EnhancedButton
        variant="outlined"
        color="error"
        startIcon={<ReplayOutlinedIcon />}
        onClick={() => handleAction("delete")}
        disabled={disabled}
      >
        delete all {status} jobs
      </EnhancedButton>
    </Wrapper>
  );
};
