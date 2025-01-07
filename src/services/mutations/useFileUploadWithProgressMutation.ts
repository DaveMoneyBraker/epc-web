import React from "react";
import { useAxiosContext } from "../../providers/axios";
import { FileMapperInputValue } from "../../types";
import { AxiosProgressEvent } from "axios";
import { useMutation } from "@tanstack/react-query";

interface MutationFnProps {
  values: FileMapperInputValue[];
  file: string | File;
  filename: string;
}

export const useFileUploadWithProgressMutation = (apiUrl: string) => {
  const { axios, loading } = useAxiosContext();
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
      setError(false);
      setProgress(0);
      try {
        const { values, filename, file } = v;
        const fileBlob = new Blob([file]);
        const formData = new FormData();
        formData.append("file", fileBlob, filename);
        values.forEach((value) => formData.append(value.name, value.value));
        await axios?.post(apiUrl, formData, {
          onUploadProgress,
          onDownloadProgress,
        });
      } catch (err) {
        console.log("FILE SUBMITTING ERROR: ", { err });
        setError(true);
      }
    },
    [apiUrl, axios, onDownloadProgress, onUploadProgress]
  );

  const mutation = useMutation({ mutationFn });

  return { loading, progress, submitted, error, mutation };
};
