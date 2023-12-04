export interface GetRoomListPayload {
  data: GameRoomList;
  status: string;
}

interface GameRoomList {
  rooms: GameRoom[];
}

export interface GameRoom {
  roomId: string;
  title: string;
  managerName: string;
  memberLimit: number;
  exerciseName: string;
  hasPassword: boolean;
}

export interface GetRoomListError {
  status: number;
  code: string;
  cause: string;
}
