export interface AuthToken {
  expiresAt: string;
  token: string;
}

export const TOKEN = "TOKEN" as const;
