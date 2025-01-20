import React from "react";
import { Box, Button } from "@mui/material";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import { QueueStatus } from "../../types";
import styled from "styled-components";

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
      <Button
        size="small"
        variant="outlined"
        startIcon={<CachedOutlinedIcon />}
        onClick={() => handleAction("refresh")}
      >
        refresh data
      </Button>
      {status === "failed" && (
        <Button
          size="small"
          variant="outlined"
          color="warning"
          startIcon={<ReplayOutlinedIcon />}
          onClick={() => handleAction("retry")}
        >
          retry all jobs
        </Button>
      )}
      <Button
        size="small"
        variant="outlined"
        color="error"
        startIcon={<ReplayOutlinedIcon />}
        onClick={() => handleAction("delete")}
      >
        delete all {status} jobs
      </Button>
    </Wrapper>
  );
};
