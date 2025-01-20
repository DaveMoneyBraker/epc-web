import React from "react";
import { Box } from "@mui/material";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import { QueueStatus } from "../../types";
import styled from "styled-components";
import { EnhancedButton } from "../../../1_enhanced";

type Action = "retry" | "delete" | "refresh";

interface Props {
  status: QueueStatus;
  onAction: (action: Action) => void;
}

const Wrapper = styled(Box)({
  width: "50%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

export const ActionsPanel: React.FC<Props> = ({ status, onAction }) => {
  const handleAction = React.useCallback(
    (action: Action) => onAction(action),
    [onAction]
  );
  return (
    <Wrapper>
      <EnhancedButton
        variant="outlined"
        startIcon={<CachedOutlinedIcon />}
        onClick={() => handleAction("refresh")}
      >
        refresh data
      </EnhancedButton>
      {status === "failed" && (
        <EnhancedButton
          variant="outlined"
          color="warning"
          startIcon={<ReplayOutlinedIcon />}
          onClick={() => handleAction("retry")}
        >
          retry all jobs
        </EnhancedButton>
      )}
      <EnhancedButton
        variant="outlined"
        color="error"
        startIcon={<ReplayOutlinedIcon />}
        onClick={() => handleAction("delete")}
      >
        delete all {status} jobs
      </EnhancedButton>
    </Wrapper>
  );
};
