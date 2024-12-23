import { useLoginMutation } from "./useLoginMutation";
import { useLogoutMutation } from "./useLogoutMutation";

const AppMutations = { useLoginMutation, useLogoutMutation } as const;

export default AppMutations;
