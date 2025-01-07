import { useLoginMutation } from "./useLoginMutation";
import { useLogoutMutation } from "./useLogoutMutation";
import { useFileUploadWithProgressMutation } from "./useFileUploadWithProgressMutation";

const AppMutations = {
  useLoginMutation,
  useLogoutMutation,
  useFileUploadWithProgressMutation,
} as const;

export default AppMutations;
