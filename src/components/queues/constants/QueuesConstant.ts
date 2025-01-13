import { QueueStatus } from "../types";

export const QUEUES: QueueConst = {
  WORKER: [
    {
      title: "Domain Lookup",
      routes: [
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
        {
          title: "Partner Validation",
          value: "PartnerValidation",
        },
        {
          title: "Email List Verify",
          value: "EmailListVerify",
        },
        {
          title: "Impression Wise",
          value: "ImpressionWise",
        },
        {
          title: "Postmaster Metadata",
          value: "PostmasterGetDomainMetadata",
        },
      ],
    },
    {
      title: "Contact Transfer",
      routes: [
        {
          title: "Iterable Transfer Subscriber",
          value: "IterableTransferSubscriber",
        },
        {
          title: "Iterable Fill Partner Exclude List",
          value: "IterableFillPartnerExcludeList",
        },
        {
          title: "Remarkety Upload Contacts",
          value: "RemarketyUploadContacts",
        },
        {
          title: "Add Contacts To ExactTarget",
          value: "ExactTargetAddContactsToDataExtension",
        },
      ],
    },
    {
      title: "Contact Suppression",
      routes: [
        {
          title: "Iterable Email Suppression",
          value: "IterableEmailSuppression",
        },
        {
          title: "Marketo Emails Suppression",
          value: "MarketoEmailsSuppression",
        },
        {
          title: "Useinsider Emails Suppression",
          value: "UseinsiderEmailsSuppression",
        },
        {
          title: "ExactTarget Emails Suppression",
          value: "ExactTargetEmailSuppression",
        },
        {
          title: "Remarkety Emails Suppression",
          value: "RemarketyEmailSuppression",
        },
        {
          title: "GreenArrow Emails Suppression",
          value: "GreenArrowEmailSuppression",
        },
        {
          title: "Moengage User Gdpr",
          value: "MoengageUserGdpr",
        },
      ],
    },
    {
      title: "Contacts Delete",
      routes: [
        {
          title: "Blueshift Delete User",
          value: "BlueshiftDeleteUser",
        },
        {
          title: "Moengage Delete User",
          value: "MoengageDataDeleteUser",
        },
      ],
    },
    {
      title: "Queue",
      routes: [
        {
          title: "Contact Import",
          value: "ContactImport",
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
          title: "Internal Validation Results",
          value: "ContactValidatedInternalResults",
        },
        {
          title: "Internal File Validation Result",
          value: "ContactValidationInternalFileResult",
        },
        {
          title: "Partner Validation Results",
          value: "ContactValidatedPartnerResults",
        },
        {
          title: "Partner Validation File Results",
          value: "ContactValidationPartnerFileResult",
        },
        {
          title: "Import File Results",
          value: "ContactImportFileResults",
        },
        {
          title: "Validated Results",
          value: "ContactValidatedResults",
        },
        {
          title: "Validated Retry Results",
          value: "ContactValidatedRetryResults",
        },
        {
          title: "Validated Secondary Results",
          value: "ContactValidatedSecondaryResults",
        },
        {
          title: "Import Results",
          value: "ContactImportResults",
        },
        {
          title: "Transfer Pending Failed Result",
          value: "ContactTransferPendingFailedResult",
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
        {
          title: "Postmaster Domain Metadata Result",
          value: "PostmasterDomainMetadataResult",
        },
      ],
    },
    {
      title: "EPC CSV",
      routes: [
        {
          title: "Esp Contact Suppression Result",
          value: "EspContactSuppressionResult",
        },
        {
          title: "Moengage Use rGdpr File Result",
          value: "MoengageUserGdprFileResult",
        },
        {
          title: "Blueshift Delete User File Result",
          value: "BlueshiftDeleteUserFileResult",
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

export const QUEUE_STATUS: { [key: string]: QueueStatus } = {
  LATEST: "latest",
  ACTIVE: "active",
  WAITING: "waiting",
  COMPLETED: "completed",
  FAILED: "failed",
  DELAYED: "delayed",
  paused: "paused",
};
