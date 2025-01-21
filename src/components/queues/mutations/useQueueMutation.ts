import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiRoutes } from "../../../core/router";
import { QueueStatus } from "../types";
import ContextHooks from "../../../providers/0_ContextHooks";

export const useQueueMutation = (queryKey: string) => {
  const queryClient = useQueryClient();
  const { axios } = ContextHooks.useAxiosContext();
  const apiUrl = ApiRoutes.QUEUE;

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
