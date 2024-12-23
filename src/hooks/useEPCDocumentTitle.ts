import { useDocumentTitle } from "usehooks-ts";

export const useEPCDocumentTitle = (title: string) => {
  useDocumentTitle(title + " | EPC");
};
