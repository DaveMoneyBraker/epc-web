import React from "react";
import { QueueStats as QueueStatsInterface } from "../../../../types";
import { Box, styled, Typography } from "@mui/material";
import APP_UTILS from "../../../../utils/0_AppUtils";

interface Props {
  stats: QueueStatsInterface | null;
}

const Wrapper = styled(Box)({
  width: "50%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "15px",
  "& .MuiBox-root": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
});

export const ServerStats: React.FC<Props> = ({ stats }) => {
  const percents = React.useMemo(
    () =>
      stats
        ? `${((+stats.used_memory * 100) / +stats.total_system_memory).toFixed(
            2
          )}%`
        : "0%",
    [stats]
  );
  const totalMemory = React.useMemo(
    () => (stats ? APP_UTILS.getFileSize(stats.total_system_memory) : "0mb"),
    [stats]
  );
  const usedMemory = React.useMemo(
    () => (stats ? APP_UTILS.getFileSize(stats.used_memory) : "0mb"),
    [stats]
  );

  return (
    <React.Fragment>
      {stats && (
        <Wrapper>
          <Box>
            <Typography variant="queueStats">Used memory(%)</Typography>
            <Typography variant="queueStats">{percents}</Typography>
          </Box>
          <Box>
            <Typography variant="queueStats">Used memory(mb)</Typography>
            <Typography variant="queueStats">
              {usedMemory} of {totalMemory}
            </Typography>
          </Box>
          <Box>
            <Typography variant="queueStats">Fragmentation ratio</Typography>
            <Typography variant="queueStats">
              {stats.mem_fragmentation_ratio}
            </Typography>
          </Box>
          <Box>
            <Typography variant="queueStats">Connected clients</Typography>{" "}
            <Typography variant="queueStats">
              {stats.connected_clients}
            </Typography>
          </Box>
          <Box>
            <Typography variant="queueStats">Blocked clients</Typography>
            <Typography variant="queueStats">
              {stats.blocked_clients}
            </Typography>
          </Box>
        </Wrapper>
      )}
    </React.Fragment>
  );
};
