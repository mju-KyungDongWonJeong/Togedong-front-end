import axios from 'axios';
import { Axios } from './Axios';
import {
  ChallengeError,
  GetChallengeResponse,
} from '../assets/type/GetChallengePayload';

interface GetChallengeProps {
  userName?: string;
  handleChallengeData: (data: GetChallengeResponse) => void;
  handleBoardError: (error: ChallengeError) => void;
}

export const GetChallenge = async ({
  userName,
  handleChallengeData,
  handleBoardError,
}: GetChallengeProps) => {
  try {
    const res = await Axios.get(`api/dash-board/challenge/${userName}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      params: {
        userName,
      },
    });

    handleChallengeData(res.data.data);
  } catch (error) {
    if (axios.isAxiosError<ChallengeError>(error) && error.response) {
      handleBoardError(error.response.data);
    }
  }
};
