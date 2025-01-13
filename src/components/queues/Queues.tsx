import React from "react";
import { useCleanedNavigationContext } from "../../providers/navigation";
import {
  QueueBody,
  QueueCounts,
  QueueJob,
  QueueStats as QueueStatsInterface,
  QueueStatus,
} from "./types";
import { QUEUE_STATUS } from "./constants";
import { useQueueQuery } from "./queries";
import { Box, styled } from "@mui/material";
import { QueueJobsTable, ServerStats, StatusBar } from "./components";

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
  const [page, setPage] = React.useState(0);
  const [status, setStatus] = React.useState<QueueStatus>(QUEUE_STATUS.LATEST);
  const { data } = useQueueQuery(apiRoute, status, page);
  const [stats, setStats] = React.useState<QueueStatsInterface | null>(null);
  const [queue, setQueue] = React.useState<QueueBody | null>(null);
  const jobs = React.useMemo<QueueJob[]>(
    () => (queue ? queue.jobs : []),
    [queue]
  );
  const counts = React.useMemo<QueueCounts | null>(
    () => (queue ? queue.counts : null),
    [queue]
  );
  const [open, setOpen] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState<QueueJob>();

  const handleStatusChange = React.useCallback(
    (value: QueueStatus) => setStatus(value),
    [setStatus]
  );

  const handleDeleteJob = React.useCallback((id: string) => {}, []);
  const handleShowJobInfo = React.useCallback(
    (job: QueueJob) => {
      setSelectedJob(job);
      setOpen(true);
    },
    [setSelectedJob, setOpen]
  );

  React.useEffect(() => {
    if (data) {
      setStats(data.stats);
      setQueue(data.queues);
    } else {
      setStats(null);
      setQueue(null);
    }
  }, [data]);

  return (
    <Wrapper>
      <ServerStats stats={stats} />
      <StatusBar
        selectedStatus={status}
        counts={counts}
        onStatusChange={handleStatusChange}
      />
      <Box
        sx={{
          display: "flex",
          flex: "1",
        }}
      >
        <QueueJobsTable
          jobs={jobs}
          onDelete={handleDeleteJob}
          onShow={handleShowJobInfo}
        />
      </Box>
      <Box>last content</Box>
    </Wrapper>
  );
};
