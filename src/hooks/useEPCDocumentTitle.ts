import { useDocumentTitle } from "usehooks-ts";

export type UseEPCDocumentTitle = (title: string) => void;

export const useEPCDocumentTitle: UseEPCDocumentTitle = (title: string) =>
  useDocumentTitle(title + " | EPC HUB");
