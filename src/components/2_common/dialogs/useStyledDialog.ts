import { Dialog, styled } from "@mui/material";

export const useStyledDialog = (disablePadding = false) =>
  styled(Dialog)(
    () => `
    &.MuiDialog-root {
  
      & .MuiDialog-paper {
        min-height: 285px;
      }
  
      & .MuiDialogTitle-root {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid lightgrey;
        padding: 12px 20px;
      }
  
      & .MuiDialogContent-root {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 15px;
        padding: ${disablePadding ? 0 : "24px 20px;"}
      }
  
  
      & .MuiDialogActions-root {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid lightgrey;
        padding: 12px 20px;
      }
    }
  `
  );
