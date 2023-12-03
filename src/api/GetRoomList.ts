import axios from 'axios';
import { Axios } from './Axios';
import {
  GetRoomListError,
  GetRoomListPayload,
} from '../assets/type/GetRoomListPayload';

interface GetRoomListProps {
  search?: string;
  selectExercise: 'PUSH_UP' | 'SQUAT';
  handleGameRoomList: (data: GetRoomListPayload) => void;
  handleError: (error: GetRoomListError) => void;
}

export const GetRoomList = async ({
  search,
  selectExercise,
  handleGameRoomList,
  handleError,
}: GetRoomListProps) => {
  try {
    const res = await Axios.get(`api/room/${selectExercise}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      params: {
        search,
        exerciseName: selectExercise,
      },
    });
    handleGameRoomList(res.data);
  } catch (error) {
    if (axios.isAxiosError<GetRoomListError>(error) && error.response) {
      handleError(error.response.data);
    }
  }
};
