import React from "react";
import {
  QueueBody,
  QueueCounts,
  QueueJob,
  QueueStats as QueueStatsInterface,
  QueueStatus,
} from "../../types";
import { Box, styled } from "@mui/material";
import {
  QueueJobInfoDialog,
  QueueJobsTable,
  QueueTopBar,
  StatusBar,
} from "./components";
import { DialogWrapper } from "../2_common/dialogs";
import { AppPagination } from "../3_shared/pagination";
import CONTEXT_HOOKS from "../../providers/0_ContextHooks";
import APP_CONSTANTS from "../../constants/AppConstants";
import AppQueries from "../../services/queries/AppQueries";
import AppMutations from "../../services/mutations/AppMutations";

type Action = "retry" | "delete" | "refresh";

const Wrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const mockedStats: QueueStatsInterface = {
  blocked_clients: "0",
  connected_clients: "0",
  mem_fragmentation_ratio: "0",
  redis_version: "?",
  total_system_memory: "1",
  used_memory: "0",
};

const mockedCounts: Omit<QueueCounts, "latest"> = {
  active: 0,
  completed: 0,
  delayed: 0,
  failed: 0,
  paused: 0,
  waiting: 0,
};

export const Queues: React.FC = () => {
  const { currentNavNode } = CONTEXT_HOOKS.useCleanedNavigationContext();
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
  const [status, setStatus] = React.useState<QueueStatus>(
    APP_CONSTANTS.QUEUE_STATUS.LATEST
  );
  const { data, client } = AppQueries.useQueueQuery(
    apiRoute,
    status,
    page,
    queryKey
  );
  const {
    deleteJobMutation,
    retryJobMutation,
    deleteAllJobsMutation,
    retryAllJobsMutation,
  } = AppMutations.useQueueMutation(queryKey);
  const [stats, setStats] = React.useState<QueueStatsInterface | null>(
    mockedStats
  );
  const [queue, setQueue] = React.useState<QueueBody | null>(null);
  const jobs = React.useMemo<QueueJob[]>(
    () => (queue ? queue.jobs : []),
    [queue]
  );
  const counts = React.useMemo<QueueCounts | null>(
    () => (queue ? queue.counts : (mockedCounts as QueueCounts)),
    [queue]
  );
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteAllOpen, setDeleteAllOpen] = React.useState(false);
  const [retryOpen, setRetryOpen] = React.useState(false);
  const [retryAllOpen, setRetryAllOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState<QueueJob>();
  const count = React.useMemo(
    () => (status === "latest" ? 0 : counts ? counts[status] : 0),
    [status, counts]
  );

  const handleStatusChange = React.useCallback(
    (value: QueueStatus) => setStatus(value),
    [setStatus]
  );

  const handlePageChange = React.useCallback(
    (value: number) => setPage(value),
    [setPage]
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

  const handleInfoClose = React.useCallback(() => setOpen(false), [setOpen]);

  React.useEffect(() => {
    if (data) {
      setStats(data.stats);
      setQueue(data.queues);
    } else {
      setStats(mockedStats);
      setQueue(null);
    }
  }, [data]);

  return (
    <>
      <Wrapper>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "background.paper",
            zIndex: 1100,
          }}
        >
          <QueueTopBar
            stats={stats}
            status={status}
            counts={counts}
            onAction={handleAction}
          />
          <StatusBar
            selectedStatus={status}
            counts={counts}
            onStatusChange={handleStatusChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            overflow: "auto",
            minHeight: 0,
          }}
        >
          <QueueJobsTable
            jobs={jobs}
            status={status}
            onToggleDialog={handleTriggerDialog}
          />
        </Box>
        {count > 0 && (
          <Box
            sx={{
              position: "sticky",
              bottom: 0,
              backgroundColor: "background.paper",
              zIndex: 1100,
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            <AppPagination
              page={page}
              count={count}
              onPageChange={handlePageChange}
            />
          </Box>
        )}
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
      {/* INFO DIALOG */}
      <QueueJobInfoDialog
        open={open}
        job={selectedJob}
        onClose={handleInfoClose}
      />
    </>
  );
};
