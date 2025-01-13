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
import { DialogWrapper } from "../2_common/dialogs";
import { useQueueMutation } from "./mutations";

const Wrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export const Queues: React.FC = () => {
  const { currentNavNode } = useCleanedNavigationContext();
  const queueName = React.useMemo(
    () => currentNavNode?.apiRoute.split("=")[1] || "",
    [currentNavNode]
  );
  const apiRoute = React.useMemo(
    () => currentNavNode?.apiRoute || "",
    [currentNavNode]
  );
  const [page, setPage] = React.useState(0);
  const queryKey = React.useMemo(() => "queue", []);
  const [status, setStatus] = React.useState<QueueStatus>(QUEUE_STATUS.LATEST);
  const { data } = useQueueQuery(apiRoute, status, page, queryKey);
  const { deleteJobMutation, retryJobMutation } = useQueueMutation(queryKey);
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
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [retryOpen, setRetryOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState<QueueJob>();

  const handleStatusChange = React.useCallback(
    (value: QueueStatus) => setStatus(value),
    [setStatus]
  );

  const handleTriggerDialog = React.useCallback(
    (job: QueueJob, action: "delete" | "show" | "retry") => {
      setSelectedJob(job);
      if (action === "delete") {
        setDeleteOpen(true);
      } else if (action === "show") {
        setOpen(true);
      } else {
        setRetryOpen(true);
      }
    },
    [setSelectedJob, setDeleteOpen, setOpen]
  );

  const handleDeleteClose = React.useCallback(
    (confirm: boolean) => {
      setDeleteOpen(false);
      if (confirm && selectedJob) {
        const { id } = selectedJob;
        deleteJobMutation.mutate({ id, queueName });
      }
      setSelectedJob(undefined);
    },
    [selectedJob, queueName, deleteJobMutation, setDeleteOpen, setSelectedJob]
  );

  const handleRetryClose = React.useCallback(
    (confirm: boolean) => {
      setRetryOpen(false);
      if (confirm && selectedJob) {
        const { id } = selectedJob;
        retryJobMutation.mutate({ id, queueName });
      }
      setSelectedJob(undefined);
    },
    [selectedJob, queueName, retryJobMutation, setRetryOpen, setSelectedJob]
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
    <>
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
            status={status}
            onToggleDialog={handleTriggerDialog}
          />
        </Box>
        <Box>last content</Box>
      </Wrapper>
      {/* DIALOGS */}
      {/* DELETE */}
      <DialogWrapper
        title="Delete this job from list?"
        open={deleteOpen}
        onClose={handleDeleteClose}
        disabled={false}
      >
        Delete job #{(selectedJob && selectedJob.id) || "0"}?
      </DialogWrapper>
      {/* RETRY */}
      <DialogWrapper
        title="Retry this job from list?"
        open={retryOpen}
        onClose={handleRetryClose}
        disabled={false}
      >
        Retry job #{(selectedJob && selectedJob.id) || "0"}?
      </DialogWrapper>
    </>
  );
};
