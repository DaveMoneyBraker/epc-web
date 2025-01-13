import React from "react";
import { QueueJob } from "../types";
import {
  IconButton,
  Paper,
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
  onDelete: (id: string) => void;
  onShow: (job: QueueJob) => void;
}

export const QueueJobsTable: React.FC<Props> = ({ jobs, onDelete, onShow }) => {
  const handleDelete = React.useCallback(
    (job: QueueJob) => onDelete(job.id),
    [onDelete]
  );
  const handleShow = React.useCallback(
    (job: QueueJob) => onShow(job),
    [onShow]
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
                  <IconButton color="error" onClick={() => handleDelete(job)}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleShow(job)}>
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
