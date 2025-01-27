import { useLoginMutation } from "./useLoginMutation";
import { useLogoutMutation } from "./useLogoutMutation";
import { useFileUploadWithProgressMutation } from "./useFileUploadWithProgressMutation";
import { useMutationQuery } from "./useMutationQuery";
import { useDownloadServerFileMutation } from "./useDownloadServerFileMutation";
import { useQueueMutation } from "./useQueueMutation";

const AppMutations = {
  useMutationQuery,
  useLoginMutation,
  useLogoutMutation,
  useFileUploadWithProgressMutation,
  useDownloadServerFileMutation,
  useQueueMutation,
} as const;

export default AppMutations;
