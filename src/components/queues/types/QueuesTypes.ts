export interface QueueStats {
  blocked_clients: string;
  connected_clients: string;
  mem_fragmentation_ratio: string;
  redis_version: string;
  total_system_memory: string;
  used_memory: string;
}

export interface QueueBody {
  allowRetries: boolean;
  isPaused: boolean;
  readOnlyMode: boolean;
  name: string;
  counts: { [key in QueueStatus]: number };
  jobs: QueueJob[];
  pagination: {
    pageCount: number;
    range: {
      start: number;
      end: number;
    };
  };
}

export interface QueueJob {
  data: any;
  finishedOn: number;
  id: string;
  isFailed: boolean;
  name: string;
  opts: {
    attempts: number;
    delay: number;
    timestamp: number;
  };
  processedOn: number;
  progress: number;
  returnValue: any;
  timestamp: number;
  stacktrace: string[];
}

export type QueueStatus =
  | "latest"
  | "active"
  | "waiting"
  | "completed"
  | "failed"
  | "delayed"
  | "paused";

export interface QueueResponse {
  queues: QueueBody;
  stats: QueueStats;
}
