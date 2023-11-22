import axios from 'axios';
import { SignupInputs } from '../../assets/pages/Signup/Signup';
import { SignupError, SignupResponse } from '../../assets/type/SignupType';
import { Axios } from '../Axios';

interface PostSignupProps {
  data: SignupInputs;
  callbackFunction: (data: SignupResponse) => void;
  handleError: (error: SignupError) => void;
}

export const PostSignup = async ({
  data,
  callbackFunction,
  handleError,
}: PostSignupProps) => {
  const { userId, userName, password } = data;
  try {
    const res = await Axios.post('/api/auth/sign-up', {
      userId,
      userName,
      password,
    });
    callbackFunction(res.data);
  } catch (error) {
    if (axios.isAxiosError<SignupError>(error) && error.response) {
      handleError(error.response.data);
    }
  }
};
