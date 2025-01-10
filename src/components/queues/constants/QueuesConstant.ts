export const QUEUES: QueueConst = {
  WORKER: [
    {
      title: "Domain Lookup",
      routes: [
        {
          title: "Click Magic",
          value: "ClickMagickCheck",
        },
        {
          title: "Blacklist Check",
          value: "BlacklistCheck",
        },
      ],
    },
    {
      title: "Contact Validation",
      routes: [
        {
          title: "Contact Internal Validation",
          value: "InternalValidation",
        },
        {
          title: "File Parser",
          value: "FileParser",
        },
      ],
    },
  ],
  CONSUMER: [
    {
      title: "Contact Svc",
      routes: [
        {
          title: "Validation File Result",
          value: "ContactValidationFileResult",
        },
        {
          title: "Validated Internal Results",
          value: "ContactValidatedInternalResults",
        },
      ],
    },
    {
      title: "Domain Lookup",
      routes: [
        {
          title: "Contact Isp Result",
          value: "ContactIspResult",
        },
        {
          title: "Blacklist Check Result",
          value: "BlacklistCheckResult",
        },
      ],
    },
  ],
};

interface QueueNavCategory {
  title: string;
  routes: {
    title: string;
    value: string;
  }[];
}

interface QueueConst {
  WORKER: QueueNavCategory[];
  CONSUMER: QueueNavCategory[];
}
