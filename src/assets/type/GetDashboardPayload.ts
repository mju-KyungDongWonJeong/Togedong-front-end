export interface DashboardResponse {
  userName: string;
  badgeCount: number;
  bestRecords: BestRecord[];
  isMine: boolean;
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
