import axios from 'axios';
import { Axios } from './Axios';
import { GetRankError, GetRankPayload } from '../assets/type/GetRankPayload';

interface GetRankProps {
  exerciseName: 'PUSH_UP' | 'SQUAT';
  handleRankData: (data: GetRankPayload) => void;
  handleRankError: (error: GetRankError) => void;
}

export const GetRank = async ({
  exerciseName,
  handleRankData,
  handleRankError,
}: GetRankProps) => {
  try {
    const res = await Axios.get(`api/dash-board/rank/${exerciseName}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      params: {
        exerciseName: exerciseName,
      },
    });

    handleRankData(res.data);
  } catch (error) {
    if (axios.isAxiosError<GetRankError>(error) && error.response) {
      handleRankError(error.response.data);
    }
  }
};
