import { useLoginMutation } from "./useLoginMutation";
import { useLogoutMutation } from "./useLogoutMutation";
import { useFileUploadWithProgressMutation } from "./useFileUploadWithProgressMutation";
import { useMutationQuery } from "./useMutationQuery";
import { useDownloadServerFileMutation } from "./useDownloadServerFileMutation";

const AppMutations = {
  useMutationQuery,
  useLoginMutation,
  useLogoutMutation,
  useFileUploadWithProgressMutation,
  useDownloadServerFileMutation,
} as const;

export default AppMutations;
