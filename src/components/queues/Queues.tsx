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
import { QueueJobsTable, QueueTopBar, StatusBar } from "./components";
import { DialogWrapper } from "../2_common/dialogs";
import { useQueueMutation } from "./mutations";

type Action = "retry" | "delete" | "refresh";

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
  const { data, client } = useQueueQuery(apiRoute, status, page, queryKey);
  const {
    deleteJobMutation,
    retryJobMutation,
    deleteAllJobsMutation,
    retryAllJobsMutation,
  } = useQueueMutation(queryKey);
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
  const [deleteAllOpen, setDeleteAllOpen] = React.useState(false);
  const [retryOpen, setRetryOpen] = React.useState(false);
  const [retryAllOpen, setRetryAllOpen] = React.useState(false);
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

  const handleDeleteAllClose = React.useCallback(
    (confirm: boolean) => {
      setDeleteAllOpen(false);
      if (confirm) {
        deleteAllJobsMutation.mutate({ status, queueName });
      }
    },
    [status, queueName, deleteAllJobsMutation, setDeleteAllOpen]
  );

  const handleRetryAllClose = React.useCallback(
    (confirm: boolean) => {
      setRetryAllOpen(false);
      if (confirm) {
        retryAllJobsMutation.mutate({ queueName });
      }
    },
    [queueName, retryAllJobsMutation, setRetryAllOpen]
  );

  const handleAction = React.useCallback(
    (action: Action) => {
      if (action === "delete") {
        setDeleteAllOpen(true);
      } else if (action === "retry") {
        setRetryAllOpen(true);
      } else {
        client.invalidateQueries({ queryKey: [queryKey] });
      }
    },
    [client, queryKey]
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
        <QueueTopBar stats={stats} status={status} onAction={handleAction} />
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
      {/* DELETE STATUS ALL*/}
      <DialogWrapper
        title="Delete all jobs by status?"
        open={deleteAllOpen}
        onClose={handleDeleteAllClose}
        disabled={false}
      >
        Delete all {status} jobs?
      </DialogWrapper>
      {/* RETRY ALL*/}
      <DialogWrapper
        title="Retry all job from list?"
        open={retryAllOpen}
        onClose={handleRetryAllClose}
        disabled={false}
      >
        Retry all jobs?
      </DialogWrapper>
    </>
  );
};
