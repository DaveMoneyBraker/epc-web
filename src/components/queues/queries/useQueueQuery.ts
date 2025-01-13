import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosContext } from "../../../providers/axios";
import { QueueResponse } from "../types";

const mocked = {
  stats: {
    redis_version: "6.2.14",
    used_memory: "7219209968",
    mem_fragmentation_ratio: "1.06",
    connected_clients: "401",
    blocked_clients: "100",
    total_system_memory: "16783659008",
  },
  queues: {
    name: "ContactValidatedInternalResults",
    counts: {
      active: 3,
      completed: 0,
      delayed: 0,
      failed: 0,
      paused: 0,
      waiting: 1143461,
    },
    jobs: [
      {
        id: "150455910",
        timestamp: 1736765371147,
        processedOn: 1736767668874,
        progress: 0,
        attempts: 0,
        stacktrace: [
          "Error: Requested entity was not found.\n    at Gaxios._request (/usr/src/app/node_modules/googleapis-common/node_modules/gaxios/build/src/gaxios.js:140:23)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async OAuth2Client.requestAsync (/usr/src/app/node_modules/googleapis-common/node_modules/google-auth-library/build/src/auth/oauth2client.js:382:18)\n    at async GCloudPostmasterService.getDomainMetadata (/usr/src/app/dist/apps/worker-svc/main.js:27679:27)\n    at async PostmasterDomainMetadataWorker.process (/usr/src/app/dist/apps/worker-svc/main.js:27496:42)\n    at async WorkerPro.callProcessJob (/usr/src/app/node_modules/@taskforcesh/bullmq-pro/dist/cjs/classes/worker-pro.js:48:24)\n    at async WorkerPro.processJob (/usr/src/app/node_modules/bullmq/dist/cjs/classes/worker.js:476:28)\n    at async WorkerPro.retryIfFailed (/usr/src/app/node_modules/bullmq/dist/cjs/classes/worker.js:661:24)",
          "Error: Requested entity was not found.\n    at Gaxios._request (/usr/src/app/node_modules/googleapis-common/node_modules/gaxios/build/src/gaxios.js:140:23)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async OAuth2Client.requestAsync (/usr/src/app/node_modules/googleapis-common/node_modules/google-auth-library/build/src/auth/oauth2client.js:382:18)\n    at async GCloudPostmasterService.getDomainMetadata (/usr/src/app/dist/apps/worker-svc/main.js:27679:27)\n    at async PostmasterDomainMetadataWorker.process (/usr/src/app/dist/apps/worker-svc/main.js:27496:42)\n    at async WorkerPro.callProcessJob (/usr/src/app/node_modules/@taskforcesh/bullmq-pro/dist/cjs/classes/worker-pro.js:48:24)\n    at async WorkerPro.processJob (/usr/src/app/node_modules/bullmq/dist/cjs/classes/worker.js:476:28)\n    at async WorkerPro.retryIfFailed (/usr/src/app/node_modules/bullmq/dist/cjs/classes/worker.js:661:24)",
          "Error: Requested entity was not found.\n    at Gaxios._request (/usr/src/app/node_modules/googleapis-common/node_modules/gaxios/build/src/gaxios.js:140:23)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async OAuth2Client.requestAsync (/usr/src/app/node_modules/googleapis-common/node_modules/google-auth-library/build/src/auth/oauth2client.js:382:18)\n    at async GCloudPostmasterService.getDomainMetadata (/usr/src/app/dist/apps/worker-svc/main.js:27679:27)\n    at async PostmasterDomainMetadataWorker.process (/usr/src/app/dist/apps/worker-svc/main.js:27496:42)\n    at async WorkerPro.callProcessJob (/usr/src/app/node_modules/@taskforcesh/bullmq-pro/dist/cjs/classes/worker-pro.js:48:24)\n    at async WorkerPro.processJob (/usr/src/app/node_modules/bullmq/dist/cjs/classes/worker.js:476:28)\n    at async WorkerPro.retryIfFailed (/usr/src/app/node_modules/bullmq/dist/cjs/classes/worker.js:661:24)",
          "Error: Requested entity was not found.\n    at Gaxios._request (/usr/src/app/node_modules/googleapis-common/node_modules/gaxios/build/src/gaxios.js:140:23)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async OAuth2Client.requestAsync (/usr/src/app/node_modules/googleapis-common/node_modules/google-auth-library/build/src/auth/oauth2client.js:382:18)\n    at async GCloudPostmasterService.getDomainMetadata (/usr/src/app/dist/apps/worker-svc/main.js:27679:27)\n    at async PostmasterDomainMetadataWorker.process (/usr/src/app/dist/apps/worker-svc/main.js:27496:42)\n    at async WorkerPro.callProcessJob (/usr/src/app/node_modules/@taskforcesh/bullmq-pro/dist/cjs/classes/worker-pro.js:48:24)\n    at async WorkerPro.processJob (/usr/src/app/node_modules/bullmq/dist/cjs/classes/worker.js:476:28)\n    at async WorkerPro.retryIfFailed (/usr/src/app/node_modules/bullmq/dist/cjs/classes/worker.js:661:24)",
          "Error: Requested entity was not found.\n    at Gaxios._request (/usr/src/app/node_modules/googleapis-common/node_modules/gaxios/build/src/gaxios.js:140:23)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async OAuth2Client.requestAsync (/usr/src/app/node_modules/googleapis-common/node_modules/google-auth-library/build/src/auth/oauth2client.js:382:18)\n    at async GCloudPostmasterService.getDomainMetadata (/usr/src/app/dist/apps/worker-svc/main.js:27679:27)\n    at async PostmasterDomainMetadataWorker.process (/usr/src/app/dist/apps/worker-svc/main.js:27496:42)\n    at async WorkerPro.callProcessJob (/usr/src/app/node_modules/@taskforcesh/bullmq-pro/dist/cjs/classes/worker-pro.js:48:24)\n    at async WorkerPro.processJob (/usr/src/app/node_modules/bullmq/dist/cjs/classes/worker.js:476:28)\n    at async WorkerPro.retryIfFailed (/usr/src/app/node_modules/bullmq/dist/cjs/classes/worker.js:661:24)",
        ],
        opts: {
          attempts: 0,
          removeOnFail: true,
          removeOnComplete: true,
          backoff: {
            delay: 5000,
            type: "fixed",
          },
        },
        data: {
          id: "ad526aec-3c58-468e-95a7-c03a89d6502b",
          timestamp: 1736765371147,
          props: {
            processId: "85a3d1ec-f271-439d-9d24-ca72c7d5d0d1",
            email: "cindylieb@aol.com",
            contactVerificationInternalId:
              "dfc7bf22-52f1-41ed-bce2-96349f12e13d",
            verificationResult: {
              status: "VALID",
              reason: {
                code: 1013,
                message: "VALID",
              },
            },
          },
        },
        name: "contact_verification_internal_result",
        returnValue: null,
        isFailed: false,
      },
      {
        id: "150455909",
        timestamp: 1736765371144,
        processedOn: 1736767668870,
        progress: 0,
        attempts: 0,
        stacktrace: [],
        opts: {
          attempts: 0,
          removeOnFail: true,
          removeOnComplete: true,
          backoff: {
            delay: 5000,
            type: "fixed",
          },
        },
        data: {
          id: "9cb44193-457d-4959-b9f3-61cf2c62abe5",
          timestamp: 1736765371144,
          props: {
            processId: "2ea4ecc2-3d1c-4bb8-84be-681c9837aa8e",
            email: "sdueker@yahoo.com",
            contactVerificationInternalId:
              "d471af59-89d6-4760-8453-6a55b501296e",
            verificationResult: {
              status: "VALID",
              reason: {
                code: 1013,
                message: "VALID",
              },
            },
          },
        },
        name: "contact_verification_internal_result",
        returnValue: null,
        isFailed: false,
      },
      {
        id: "150455908",
        timestamp: 1736765371144,
        processedOn: 1736767668868,
        progress: 0,
        attempts: 0,
        stacktrace: [],
        opts: {
          attempts: 0,
          removeOnFail: true,
          removeOnComplete: true,
          backoff: {
            delay: 5000,
            type: "fixed",
          },
        },
        data: {
          id: "fc3e19f9-425f-42a7-91cb-7b7ded175e4e",
          timestamp: 1736765371144,
          props: {
            processId: "8669a3f8-af7e-4c04-a293-d11c4c9c5a3a",
            email: "ranaeandronm@yahoo.com",
            contactVerificationInternalId:
              "d80a83a8-0476-440d-9126-b7c0f0e9ee01",
            verificationResult: {
              status: "VALID",
              reason: {
                code: 1013,
                message: "VALID",
              },
            },
          },
        },
        name: "contact_verification_internal_result",
        returnValue: null,
        isFailed: false,
      },
      {
        id: "151599370",
        timestamp: 1736767668873,
        progress: 0,
        attempts: 0,
        stacktrace: [],
        opts: {
          attempts: 0,
          removeOnFail: true,
          removeOnComplete: true,
          backoff: {
            delay: 5000,
            type: "fixed",
          },
        },
        data: {
          id: "17f7d576-cdf4-4c2e-8695-78409d43fd75",
          timestamp: 1736767668873,
          props: {
            processId: "d8bac107-0f0c-452b-aff1-502e935ff374",
            email: "mail027@aol.com",
            contactVerificationInternalId:
              "7df251cf-3041-4d39-9853-df61f2a55970",
            verificationResult: {
              status: "VALID",
              reason: {
                code: 1013,
                message: "VALID",
              },
            },
          },
        },
        name: "contact_verification_internal_result",
        returnValue: null,
        isFailed: false,
      },
      {
        id: "151599369",
        timestamp: 1736767668873,
        progress: 0,
        attempts: 0,
        stacktrace: [],
        opts: {
          attempts: 0,
          removeOnFail: true,
          removeOnComplete: true,
          backoff: {
            delay: 5000,
            type: "fixed",
          },
        },
        data: {
          id: "65787a61-6d0d-4b75-bbb2-facd0b1b2f31",
          timestamp: 1736767668873,
          props: {
            processId: "2d1b37fe-2b9e-4d9d-a49d-e39a399cffc6",
            email: "scottjuvette@yahoo.com",
            contactVerificationInternalId:
              "c2008983-202c-4d5d-9fdb-115d5ba99837",
            verificationResult: {
              status: "VALID",
              reason: {
                code: 1013,
                message: "VALID",
              },
            },
          },
        },
        name: "contact_verification_internal_result",
        returnValue: null,
        isFailed: false,
      },
      {
        id: "151599368",
        timestamp: 1736767668871,
        progress: 0,
        attempts: 0,
        stacktrace: [],
        opts: {
          attempts: 0,
          removeOnFail: true,
          removeOnComplete: true,
          backoff: {
            delay: 5000,
            type: "fixed",
          },
        },
        data: {
          id: "530c53ea-4609-41a6-a535-681d589b992c",
          timestamp: 1736767668871,
          props: {
            processId: "0f57278d-a998-44ba-b0d6-c7930e289512",
            email: "danielyfp@yahoo.com",
            contactVerificationInternalId:
              "ff1e5612-102a-4f59-b62c-47932c23d347",
            verificationResult: {
              status: "INVALID",
              reason: {
                code: 1002,
                message: "SUPPRESSION_EMAIL",
              },
            },
          },
        },
        name: "contact_verification_internal_result",
        returnValue: null,
        isFailed: false,
      },
      {
        id: "151599367",
        timestamp: 1736767668868,
        progress: 0,
        attempts: 0,
        stacktrace: [],
        opts: {
          attempts: 0,
          removeOnFail: true,
          removeOnComplete: true,
          backoff: {
            delay: 5000,
            type: "fixed",
          },
        },
        data: {
          id: "9d36d0b2-731c-4b5c-8517-087a6b9ed4d5",
          timestamp: 1736767668868,
          props: {
            processId: "65e55439-3b1d-41a7-8de6-68943b6f20a6",
            email: "xediex@aol.com",
            contactVerificationInternalId:
              "cd9ca94a-e5e0-41aa-8283-7b8ecfc28e49",
            verificationResult: {
              status: "VALID",
              reason: {
                code: 1013,
                message: "VALID",
              },
            },
          },
        },
        name: "contact_verification_internal_result",
        returnValue: null,
        isFailed: false,
      },
      {
        id: "151599366",
        timestamp: 1736767668868,
        progress: 0,
        attempts: 0,
        stacktrace: [],
        opts: {
          attempts: 0,
          removeOnFail: true,
          removeOnComplete: true,
          backoff: {
            delay: 5000,
            type: "fixed",
          },
        },
        data: {
          id: "a13dc9be-e8e8-429e-ab7b-f32a1803c789",
          timestamp: 1736767668868,
          props: {
            processId: "10074bce-f63e-4d01-b2d0-6f3d8eb1654c",
            email: "mloulady@aol.com",
            contactVerificationInternalId:
              "7cb08d21-a031-4e16-9412-8a5dc323c733",
            verificationResult: {
              status: "INVALID",
              reason: {
                code: 1002,
                message: "SUPPRESSION_EMAIL",
              },
            },
          },
        },
        name: "contact_verification_internal_result",
        returnValue: null,
        isFailed: false,
      },
      {
        id: "151599365",
        timestamp: 1736767668868,
        progress: 0,
        attempts: 0,
        stacktrace: [],
        opts: {
          attempts: 0,
          removeOnFail: true,
          removeOnComplete: true,
          backoff: {
            delay: 5000,
            type: "fixed",
          },
        },
        data: {
          id: "4546e548-761e-4b6a-a8d4-bde6a7f63efb",
          timestamp: 1736767668868,
          props: {
            processId: "0b1d3c2d-a3f1-423f-af0c-0e89a6fc8de9",
            email: "nckratzen@aol.com",
            contactVerificationInternalId:
              "67b59638-19c3-48d8-865c-a834b6b79b61",
            verificationResult: {
              status: "VALID",
              reason: {
                code: 1013,
                message: "VALID",
              },
            },
          },
        },
        name: "contact_verification_internal_result",
        returnValue: null,
        isFailed: false,
      },
      {
        id: "151599364",
        timestamp: 1736767668868,
        progress: 0,
        attempts: 0,
        stacktrace: [],
        opts: {
          attempts: 0,
          removeOnFail: true,
          removeOnComplete: true,
          backoff: {
            delay: 5000,
            type: "fixed",
          },
        },
        data: {
          id: "4e799838-a326-4f6e-ab5e-3a865f17641b",
          timestamp: 1736767668868,
          props: {
            processId: "70c7446f-6110-4579-b9e1-99a9b74d7022",
            email: "lwalker327@aol.com",
            contactVerificationInternalId:
              "4a6e9f2b-ceb6-477d-bf8e-b87256cca42e",
            verificationResult: {
              status: "VALID",
              reason: {
                code: 1013,
                message: "VALID",
              },
            },
          },
        },
        name: "contact_verification_internal_result",
        returnValue: null,
        isFailed: false,
      },
      {
        id: "151599363",
        timestamp: 1736767668866,
        progress: 0,
        attempts: 0,
        stacktrace: [],
        opts: {
          attempts: 0,
          removeOnFail: true,
          removeOnComplete: true,
          backoff: {
            delay: 5000,
            type: "fixed",
          },
        },
        data: {
          id: "c03ed1d2-3602-4a62-9c8b-64102617da06",
          timestamp: 1736767668866,
          props: {
            processId: "5888e7d3-0242-4e17-8fea-bcdf9fae16f7",
            email: "roselaine1@aol.com",
            contactVerificationInternalId:
              "02e3946f-9019-4001-ba5d-051a76f262db",
            verificationResult: {
              status: "VALID",
              reason: {
                code: 1013,
                message: "VALID",
              },
            },
          },
        },
        name: "contact_verification_internal_result",
        returnValue: null,
        isFailed: false,
      },
      {
        id: "151599362",
        timestamp: 1736767668866,
        progress: 0,
        attempts: 0,
        stacktrace: [],
        opts: {
          attempts: 0,
          removeOnFail: true,
          removeOnComplete: true,
          backoff: {
            delay: 5000,
            type: "fixed",
          },
        },
        data: {
          id: "c7585095-6595-42d8-a03b-9b7555305be1",
          timestamp: 1736767668866,
          props: {
            processId: "66f2afb6-819a-4f51-a4d1-04650846776c",
            email: "thebellsofny@yahoo.com",
            contactVerificationInternalId:
              "7cf7b3ab-1084-4da0-ae55-250be2f38863",
            verificationResult: {
              status: "VALID",
              reason: {
                code: 1013,
                message: "VALID",
              },
            },
          },
        },
        name: "contact_verification_internal_result",
        returnValue: null,
        isFailed: false,
      },
      {
        id: "151599361",
        timestamp: 1736767668864,
        progress: 0,
        attempts: 0,
        stacktrace: [],
        opts: {
          attempts: 0,
          removeOnFail: true,
          removeOnComplete: true,
          backoff: {
            delay: 5000,
            type: "fixed",
          },
        },
        data: {
          id: "338a8480-1b9b-4439-82a9-f15a7ad31781",
          timestamp: 1736767668864,
          props: {
            processId: "14927bee-38cb-4d47-8222-d0c0657f647d",
            email: "jvbaggett@yahoo.com",
            contactVerificationInternalId:
              "74af048e-4b00-4aa1-ab45-b2422d2b19d2",
            verificationResult: {
              status: "INVALID",
              reason: {
                code: 1002,
                message: "SUPPRESSION_EMAIL",
              },
            },
          },
        },
        name: "contact_verification_internal_result",
        returnValue: null,
        isFailed: false,
      },
    ],
    pagination: {
      pageCount: 1,
      range: {
        start: 0,
        end: 9,
      },
    },
    readOnlyMode: false,
    allowRetries: true,
    isPaused: false,
  },
} as unknown as QueueResponse;

export const useQueueQuery = (
  apiUrl: string,
  status: string,
  page: number,
  queryKey: string
) => {
  const { axios } = useAxiosContext();
  const client = useQueryClient();

  const queryFn = React.useCallback(async (): Promise<QueueResponse | null> => {
    if (apiUrl && apiUrl.includes("?")) {
      const url = `${apiUrl}&status=${status}&page=${page + 1}`;
      const response = await axios?.get<{ body: QueueResponse }>(url);
      if (response) {
        const {
          data: { body },
        } = response;
        return mocked;
      } else if (!response) {
        throw new Error("No Server Response");
      }
    }
    return null;
  }, [apiUrl, status, page, axios]);

  const data = useQuery<QueueResponse | null>({
    queryKey: [queryKey],
    retry: 1,
    queryFn,
    initialData: null,
  });

  React.useEffect(() => {
    client.invalidateQueries({ queryKey: [queryKey] });
  }, [apiUrl, status, page, client, queryKey]);

  return { ...data, client };
};
