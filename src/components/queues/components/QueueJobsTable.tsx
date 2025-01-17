import React from "react";
import { QueueJob, QueueStatus } from "../types";
import {
  Box,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AppUtils from "../../../utils/0_AppUtils";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { NoTableDataMessage } from "../../3_shared/noTableDataMessage";

interface Props {
  status: QueueStatus;
  jobs: QueueJob[];
  onToggleDialog: (job: QueueJob, action: "delete" | "show" | "retry") => void;
}

export const QueueJobsTable: React.FC<Props> = ({
  jobs,
  status,
  onToggleDialog,
}) => {
  const handleToggleDialog = React.useCallback(
    (job: QueueJob, action: "delete" | "show" | "retry") =>
      onToggleDialog(job, action),
    [onToggleDialog]
  );
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: "100%", minHeight: "100%" }}
        size="small"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            {status === "failed" && <TableCell>Retry</TableCell>}
            <TableCell>Number</TableCell>
            <TableCell>Added At</TableCell>
            <TableCell>Started At</TableCell>
            <TableCell>Finished At</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>Info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs &&
            jobs.map((job, i) => (
              <TableRow key={i}>
                {status === "failed" && (
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleToggleDialog(job, "retry")}
                    >
                      <ReplayOutlinedIcon />
                    </IconButton>
                  </TableCell>
                )}
                <TableCell>#{job.id || 0}</TableCell>
                <TableCell>
                  {job.timestamp && AppUtils.formatDate(job.timestamp)}
                </TableCell>
                <TableCell>
                  {job.processedOn && AppUtils.formatDate(job.processedOn)}
                </TableCell>
                <TableCell>
                  {job.finishedOn && AppUtils.formatDate(job.finishedOn)}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    color={job.isFailed ? "error" : "success"}
                  >
                    {job.isFailed ? "Failed" : "Processed"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleToggleDialog(job, "delete")}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleToggleDialog(job, "show")}
                  >
                    <OpenInNewOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          {(!jobs || jobs.length === 0) && (
            <TableRow>
              <TableCell colSpan={100} sx={{ border: "none", padding: 0 }}>
                <NoTableDataMessage />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
