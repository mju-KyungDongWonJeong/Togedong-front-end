export interface PostChallengePayload {
  message: string;
  status: string;
}

export interface PostChallengeError {
  status: number;
  code: string;
  cause: string;
}
