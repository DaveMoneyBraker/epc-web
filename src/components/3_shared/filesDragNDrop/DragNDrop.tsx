import React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import APP_CONSTANTS from "../../../constants/0_AppConstants";
import { EnhancedIconButton } from "../../1_enhanced";

interface Props {
  fileSizeLimit: number;
  selectedFiles: File[];
  onFilesSelect: (files: File[]) => void;
  onFileDelete: (index: number) => void;
}

// Styled components for the drag and drop area
const DropZone = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
  "&.active": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.selected,
  },
}));

// Styled component for the scrollable file list
const ScrollableFileList = styled(List)({
  maxHeight: "200px",
  overflow: "auto",
});

export const AppDragNDrop: React.FC<Props> = ({
  fileSizeLimit,
  selectedFiles,
  onFilesSelect,
  onFileDelete,
}) => {
  const notification = APP_HOOKS.useNotification();
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const getFilesArrayMBSize = React.useCallback(
    (files: File[]) =>
      files.reduce(
        (acc, current) => acc + +(current.size / (1024 * 1024)).toFixed(4),
        0
      ),
    []
  );

  const totalFilesSize = React.useMemo(
    () => getFilesArrayMBSize(selectedFiles),
    [selectedFiles, getFilesArrayMBSize]
  );

  const usedSpacePercentage = (totalFilesSize / fileSizeLimit) * 100;

  const isEmpty = React.useCallback(
    (files: File[]) => files.some((f) => f.size === 0),
    []
  );

  const isFileSizeLegit = React.useCallback(
    (files: File[]): boolean => {
      const newFilesTotalSize = getFilesArrayMBSize(files);
      return newFilesTotalSize + totalFilesSize <= fileSizeLimit;
    },
    [fileSizeLimit, totalFilesSize, getFilesArrayMBSize]
  );

  const proceedFiles = React.useCallback(
    (newFiles: File[]) => {
      const newFilesNames = newFiles.map((file) => file.name);

      if (!newFilesNames.every((name) => name.endsWith(".csv"))) {
        return notification(
          "Wrong File Type! .csv Only!",
          APP_CONSTANTS.NOTIFICATION_VARIANTS.WARNING
        );
      }

      const oldFileNames = selectedFiles.map((file) => file.name);

      if (
        newFilesNames.some((newName) =>
          oldFileNames.some((oldName) => oldName === newName)
        )
      ) {
        return notification(
          "You Already Drop File With Same Name!",
          APP_CONSTANTS.NOTIFICATION_VARIANTS.WARNING
        );
      }

      if (isEmpty(newFiles)) {
        return notification(
          "Some of your files is empty!",
          APP_CONSTANTS.NOTIFICATION_VARIANTS.WARNING
        );
      }

      if (!isFileSizeLegit(newFiles)) {
        return notification(
          "The Total File Size Exceeds the Limit!",
          APP_CONSTANTS.NOTIFICATION_VARIANTS.WARNING
        );
      }

      onFilesSelect(newFiles);
    },
    [selectedFiles, isFileSizeLegit, onFilesSelect, isEmpty, notification]
  );

  const handleDrop = React.useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragging(false);
      const droppedFiles = event.dataTransfer.files;
      if (droppedFiles.length > 0) {
        const newFiles = Array.from(droppedFiles) as File[];
        proceedFiles(newFiles);
      }
    },
    [proceedFiles]
  );

  const handleDragOver = React.useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragging(true);
    },
    [setIsDragging]
  );

  const handleDragLeave = React.useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragging(false);
    },
    [setIsDragging]
  );

  const handleClick = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const current = inputRef.current;
    if (current) {
      current.click();
    }
  }, []);

  const handleFilesSelected = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const {
        currentTarget: { files: browserFiles },
      } = event;
      if (browserFiles && browserFiles.length > 0) {
        const newFiles = Array.from(browserFiles) as File[];
        proceedFiles(newFiles);
      }
    },
    [setIsDragging, proceedFiles]
  );

  const handleFileDelete = React.useCallback(
    (index: number) => onFileDelete(index),
    [onFileDelete]
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%", // Full viewport height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        <input
          ref={inputRef}
          style={{ display: "none" }}
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={handleFilesSelected}
        />
        <DropZone
          className={isDragging ? "active" : ""}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <Stack spacing={2} alignItems="center">
            <CloudUploadIcon sx={{ fontSize: 48, color: "primary.main" }} />
            <Stack spacing={1} alignItems="center">
              <Typography variant="h6">
                Drag and drop your files here
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Or click and chose files from browser
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Limit {fileSizeLimit}MB total. CSV files only.
              </Typography>
            </Stack>
          </Stack>
        </DropZone>

        {selectedFiles.length > 0 && (
          <Box
            sx={{
              mt: 3,
              backgroundColor: "background.paper",
              borderRadius: 1,
              p: 2,
              boxShadow: 1,
            }}
          >
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Storage Usage
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={usedSpacePercentage}
                  sx={{ height: 8, borderRadius: 1 }}
                />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: 1 }}
                >
                  <Typography variant="caption">
                    Used: {totalFilesSize.toFixed(2)}MB
                  </Typography>
                  <Typography variant="caption">
                    Available: {(fileSizeLimit - totalFilesSize).toFixed(2)}MB
                  </Typography>
                </Stack>
              </Box>

              <ScrollableFileList>
                {selectedFiles.map((file, index) => (
                  <ListItem
                    key={`file-${file.name}-${index}`}
                    dense
                    disablePadding
                    divider
                    sx={{
                      bgcolor: "background.paper",
                      borderRadius: 1,
                      mb: 1,
                      "&:last-child": {
                        mb: 0,
                      },
                    }}
                    secondaryAction={
                      <EnhancedIconButton
                        icon={ClearIcon}
                        edge="end"
                        onClick={() => handleFileDelete(index)}
                      />
                    }
                  >
                    <ListItemText
                      primary={file.name}
                      secondary={`${(file.size / (1024 * 1024)).toFixed(2)} MB`}
                    />
                  </ListItem>
                ))}
              </ScrollableFileList>
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};
