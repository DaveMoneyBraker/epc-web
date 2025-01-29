import React from "react";
import { FileMapperInputValue } from "../../types";
import { AxiosProgressEvent } from "axios";
import { useMutation } from "@tanstack/react-query";
import APP_CONSTANTS from "../../constants/0_AppConstants";
import CONTEXT_HOOKS from "../../providers/0_ContextHooks";

interface MutationFnProps {
  file: string;
  filename: string;
  values?: FileMapperInputValue[];
}

export const useFileUploadWithProgressMutation = (apiUrl: string) => {
  const { axios, loading } = CONTEXT_HOOKS.useAxiosContext();
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState(false);
  const submitted = React.useMemo(
    () => !error && progress === 100,
    [error, progress]
  );

  const onUploadProgress = React.useCallback(
    ({ loaded, total }: AxiosProgressEvent) => {
      const value = total ? (loaded / total) * 50 : 0;
      setProgress(value);
    },
    [setProgress]
  );

  const onDownloadProgress = React.useCallback(
    ({ loaded, total }: AxiosProgressEvent) => {
      const value = total ? 50 + (loaded / total) * 50 : 0;
      setProgress(value);
    },
    [setProgress]
  );

  const mutationFn = React.useCallback(
    async (v: MutationFnProps) => {
      if (!axios) {
        throw new Error(APP_CONSTANTS.APP_ERRORS.NO_AXIOS_INSTANCE);
      }

      setError(false);
      setProgress(0);

      try {
        const { values = [], filename, file } = v;
        const formData = new FormData();
        const fileBlob = new Blob([file]);
        formData.append("file", fileBlob, filename);
        values.forEach((value) => formData.append(value.name, value.value));
        await axios.post(apiUrl, formData, {
          onUploadProgress,
          onDownloadProgress,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (error) {
        console.log("FILE SUBMITTING ERROR: ", { error });
        setError(true);
        throw error;
      }
    },
    [apiUrl, axios, onDownloadProgress, onUploadProgress]
  );

  const reset = React.useCallback(() => {
    setError(false);
    setProgress(0);
  }, [setError, setProgress]);

  const mutation = useMutation({ mutationFn });

  return { loading, progress, submitted, error, mutation, reset };
};
