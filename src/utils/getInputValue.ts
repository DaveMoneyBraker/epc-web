import React from "react";

export const getInputValue = (
  event: React.FormEvent<HTMLInputElement>
): string => event.currentTarget.value;
