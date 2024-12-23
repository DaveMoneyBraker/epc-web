import React from "react";
import { IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import APP_CONSTANTS from "../../../constants/AppConstants";
import AppHooks from "../../../hooks/0_AppHooks";
// STYLES
import "./styles/drag-drop.scss";
import "./styles/dark-drag-drop.scss";

interface Props {
  fileSizeLimit: number;
  selectedFiles: File[];
  onFilesSelect: (files: File[]) => void;
  onFileDelete: (index: number) => void;
}

export const FileMapperDragNDrop: React.FC<Props> = ({
  fileSizeLimit,
  selectedFiles,
  onFilesSelect,
  onFileDelete,
}) => {
  const notification = AppHooks.useNotification();

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

      // CHECK FOR FILE TYPE JUST BY CHECKING END OF FILENAME
      if (!newFilesNames.every((name) => name.endsWith(".csv"))) {
        return notification(
          "Wrong File Type! .csv Only!",
          APP_CONSTANTS.NOTIFICATION_VARIANTS.WARNING
        );
      }
      const oldFileNames = selectedFiles.map((file) => file.name);

      // CHECKING IS FILE ALREADY DROPPED BY FILENAMES
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

      // CHECK IS EMPTY (EMPTY FILE WILL BROKE PAPAPARSE)
      if (isEmpty(newFiles)) {
        return notification(
          "Some of your files is empty!",
          APP_CONSTANTS.NOTIFICATION_VARIANTS.WARNING
        );
      }

      // CHECK FILE SIZE LIMIT
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
    (event: any) => {
      event.preventDefault();
      const droppedFiles = event.dataTransfer.files;
      if (droppedFiles.length > 0) {
        const newFiles = Array.from(droppedFiles) as File[];
        proceedFiles(newFiles);
      }
    },
    [proceedFiles]
  );

  const handleRemoveFile = React.useCallback(
    (index: number) => onFileDelete(index),
    [onFileDelete]
  );

  return (
    <section className="drag-drop">
      <div
        className={`document-uploader ${
          selectedFiles.length > 0 ? "upload-box active" : "upload-box"
        }`}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <div className="upload-info">
          <CloudUploadIcon />
          <div>
            <p>Drag and drop your files here</p>
            <p>Limit 15MB total.</p>
            <p>.CSV FILES ONLY!</p>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="file-list">
            <div className="file-list__container">
              <div className="file-list__size">
                <p>Total file's size: {totalFilesSize}MB</p>
                <p>
                  Size left: {(fileSizeLimit - totalFilesSize).toFixed(2)}MB
                </p>
              </div>
              {selectedFiles.map((file, index) => (
                <div className="file-item" key={index}>
                  <div className="file-info">
                    <p>{file.name}</p>
                  </div>
                  <div className="file-actions">
                    <IconButton onClick={() => handleRemoveFile(index)}>
                      <ClearIcon />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
