import { TitleValueObject } from "../default/default";

export const SUPPRESSION_TYPES = {
  MANUAL: "MANUAL",
  DISPOSABLE: "DISPOSABLE",
  SPAMTRAP: "SPAMTRAP",
  ABUSE: "ABUSE",
  UNRECOGNIZED: "UNRECOGNIZED",
} as const;

export type SuppressionType =
  (typeof SUPPRESSION_TYPES)[keyof typeof SUPPRESSION_TYPES];

export const SuppressionTypeOptions: TitleValueObject<SuppressionType>[] = [
  { title: SUPPRESSION_TYPES.MANUAL, value: SUPPRESSION_TYPES.MANUAL },
  { title: SUPPRESSION_TYPES.ABUSE, value: SUPPRESSION_TYPES.ABUSE },
  { title: SUPPRESSION_TYPES.DISPOSABLE, value: SUPPRESSION_TYPES.DISPOSABLE },
  { title: SUPPRESSION_TYPES.SPAMTRAP, value: SUPPRESSION_TYPES.SPAMTRAP },
  {
    title: SUPPRESSION_TYPES.UNRECOGNIZED,
    value: SUPPRESSION_TYPES.UNRECOGNIZED,
  },
];
