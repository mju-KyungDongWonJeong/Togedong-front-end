export interface GetRankPayload {
  data: Data[];
}

interface Data {
  name: string;
  count: number;
}

export interface GetRankError {
  status: number;
  code: string;
  cause: string;
}
