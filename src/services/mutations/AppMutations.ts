import { useLoginMutation } from "./useLoginMutation";
import { useLogoutMutation } from "./useLogoutMutation";
import { useFileUploadWithProgressMutation } from "./useFileUploadWithProgressMutation";
import { useMutationQuery } from "./useMutationQuery";

const AppMutations = {
  useMutationQuery,
  useLoginMutation,
  useLogoutMutation,
  useFileUploadWithProgressMutation,
} as const;

export default AppMutations;
