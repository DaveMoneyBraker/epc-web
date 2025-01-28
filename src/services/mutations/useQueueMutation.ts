import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CONTEXT_HOOKS from "../../providers/0_ContextHooks";
import APP_CONSTANTS from "../../constants/AppConstants";
import { QueueStatus } from "../../types";

export const useQueueMutation = (queryKey: string) => {
  const queryClient = useQueryClient();
  const { axios } = CONTEXT_HOOKS.useAxiosContext();
  const apiUrl = React.useMemo(() => APP_CONSTANTS.API_ROUTES.QUEUE, []);

  // DELETE ONE JOB
  const deleteJobMutationFn = React.useCallback(
    async (input: { id: string; queueName: string }): Promise<any> => {
      if (axios) {
        const { id, queueName } = input;
        const url = apiUrl + `/${queueName}/${id}/clean`;
        const res = await axios.put(url, null);
        if (res) {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
          return res.data;
        }
      }
    },
    [apiUrl, queryKey, axios, queryClient]
  );
  const deleteJobMutation = useMutation({ mutationFn: deleteJobMutationFn });

  // DELETE ALL JOBS
  const deleteAllJobsMutationFn = React.useCallback(
    async (input: { status: QueueStatus; queueName: string }): Promise<any> => {
      if (axios) {
        const { status, queueName } = input;
        const url =
          apiUrl +
          `/${queueName}/clean/${status === "waiting" ? "wait" : status}`;
        const res = await axios.put(url, null);
        if (res) {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
          return res.data;
        }
      }
    },
    [apiUrl, queryKey, axios, queryClient]
  );
  const deleteAllJobsMutation = useMutation({
    mutationFn: deleteAllJobsMutationFn,
  });

  // RETRY ONE JOB
  const retryJobMutationFn = React.useCallback(
    async (input: { id: string; queueName: string }): Promise<any> => {
      if (axios) {
        const { id, queueName } = input;
        const url = apiUrl + `/${queueName}/${id}/retry`;
        const res = await axios.put(url, null);
        if (res) {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
          return res.data;
        }
      }
    },
    [apiUrl, queryKey, axios, queryClient]
  );
  const retryJobMutation = useMutation({
    mutationFn: retryJobMutationFn,
  });

  // RETRY ALL JOBS
  const retryAllJobsMutationFn = React.useCallback(
    async (input: { queueName: string }): Promise<any> => {
      if (axios) {
        const { queueName } = input;
        const url = apiUrl + `/${queueName}/retry`;
        const res = await axios.put(url, null);
        if (res) {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
          return res.data;
        }
      }
    },
    [apiUrl, queryKey, axios, queryClient]
  );
  const retryAllJobsMutation = useMutation({
    mutationFn: retryAllJobsMutationFn,
  });

  return {
    deleteJobMutation,
    deleteAllJobsMutation,
    retryJobMutation,
    retryAllJobsMutation,
  };
};
