import React from "react";
import { QueueJob } from "../types";
import {
  IconButton,
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

interface Props {
  jobs: QueueJob[];
  onToggleDialog: (job: QueueJob, action: "delete" | "show") => void;
}

export const QueueJobsTable: React.FC<Props> = ({ jobs, onToggleDialog }) => {
  const handleToggleDialog = React.useCallback(
    (job: QueueJob, action: "delete" | "show") => onToggleDialog(job, action),
    [onToggleDialog]
  );
  return (
    <TableContainer sx={{ maxHeight: "calc(100vh - 220px)" }}>
      <Table sx={{ minWidth: "100%" }} size="small" stickyHeader>
        <TableHead>
          <TableRow>
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
        </TableBody>
      </Table>
    </TableContainer>
  );
};
