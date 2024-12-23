import React from "react";

export const isSyntheticEvent = (event: any): event is React.SyntheticEvent => {
  // KOSTYL FOR DEVELOPMENT
  if (typeof event === "boolean" || event === undefined) {
    return false;
  }
  return event.type !== undefined && event.timeStamp !== undefined;
};
