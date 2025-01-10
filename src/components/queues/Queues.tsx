import React from "react";
import { useCleanedNavigationContext } from "../../providers/navigation";
import {
  QueueBody,
  QueueStats as QueueStatsInterface,
  QueueStatus,
} from "./types";
import { QUEUE_STATUS } from "./constants";
import { useQueueQuery } from "./queries";
import { Box, styled } from "@mui/material";
import { QueueStats } from "./components";

const Wrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export const Queues: React.FC = () => {
  const { currentNavNode } = useCleanedNavigationContext();
  const apiRoute = React.useMemo(
    () => currentNavNode?.apiRoute || "",
    [currentNavNode]
  );
  const [status, setStatus] = React.useState<QueueStatus>(QUEUE_STATUS.LATEST);
  const [page, setPage] = React.useState(0);
  const { data } = useQueueQuery(apiRoute, status, page);
  const [stats, setStats] = React.useState<QueueStatsInterface | null>(null);
  const [queue, setQueue] = React.useState<QueueBody | null>(null);

  React.useEffect(() => {
    if (data) {
      setStats(data.stats);
      setQueue(data.queues);
    }
  }, [data]);

  // React.useEffect(() => {
  //   console.log({ stats });
  //   console.log({ queue });
  // }, [queue, stats]);

  return (
    <Wrapper>
      <QueueStats stats={stats} />
      <Box
        sx={{
          display: "flex",
          flex: "1",
        }}
      >
        somecontent
      </Box>
      <Box>last content</Box>
    </Wrapper>
  );
};
