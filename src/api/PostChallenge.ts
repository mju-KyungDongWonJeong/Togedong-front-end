import axios from 'axios';
import { Axios } from './Axios';
import {
  PostChallengeError,
  PostChallengePayload,
} from '../assets/type/PostChallengePayload';

export interface PostChallengeProps {
  userName?: string;
  challengeName: 'pushUp ' | 'squat';
  handlePostChallenge: (data: PostChallengePayload) => void;
  handleBoardError: (error: PostChallengeError) => void;
}

export const PostChallenge = async ({
  userName,
  challengeName,
  handlePostChallenge,
  handleBoardError,
}: PostChallengeProps) => {
  try {
    const res = await Axios.post(
      `api/dash-board/challenge/${userName}/${challengeName}`,
      {
        challengeName,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
    handlePostChallenge(res.data);
  } catch (error) {
    if (axios.isAxiosError<PostChallengeError>(error) && error.response) {
      handleBoardError(error.response.data);
    }
  }
};
