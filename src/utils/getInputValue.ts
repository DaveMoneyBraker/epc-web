import React from "react";

export const getInputValue = (
  event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
): string => event.currentTarget.value;
