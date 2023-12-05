export interface DashboardResponse {
  userName: string;
  badgeResponse: BadgeResponse;
  bestRecords: BestRecord[];
  isMine: boolean;
}

interface BadgeResponse {
  badgeCount: number;
  badgePercent: number;
  badges: Badge;
}

export interface Badge {
  PUSH_UP_BADGE: boolean;
  SQUAT_BADGE: boolean;
}

export interface DashboardError {
  status: number;
  code: string;
  cause: string;
}

export interface BestRecord {
  exerciseName: '푸쉬업' | '스쿼트';
  record: number;
}
