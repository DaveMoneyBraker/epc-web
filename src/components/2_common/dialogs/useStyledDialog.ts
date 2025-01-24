import { Dialog, styled } from "@mui/material";

export const useStyledDialog = (disablePadding = false, minHeight = "285px") =>
  styled(Dialog)(
    () => `
    &.MuiDialog-root {
  
      & .MuiDialog-paper {
        min-height: ${minHeight};
      }
  
      & .MuiDialogTitle-root {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid lightgrey;
        padding: 12px 20px;
        position: relative;
      }
  
      & .MuiDialogContent-root {
        padding: ${disablePadding ? 0 : "24px 20px;"};
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
