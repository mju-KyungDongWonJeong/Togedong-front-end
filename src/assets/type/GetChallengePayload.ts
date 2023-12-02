export interface GetChallengeResponse {
  challenges: Challenge[];
  isMine: boolean;
}

export interface Challenge {
  challengeId: 'pushUp ' | 'squat';
  description: string;
  participantCount: number;
  progressPercent: number;
  isParticipating: 'NOT_PARTICIPANT' | 'PARTICIPANT';
}

export interface ChallengeError {
  status: number;
  code: string;
  cause: string;
}
