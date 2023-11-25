import axios from 'axios';
import { LoginInputs } from '../../assets/pages/Login/Login';
import { Axios } from '../Axios';
import { LoginError, LoginResponse } from '../../assets/type/PostLoginPayload';

interface PostLoginProps {
  data: LoginInputs;
  callbackFunction: (data: LoginResponse) => void;
  handleError: (error: LoginError) => void;
}

export const PostLogin = async ({
  data,
  callbackFunction,
  handleError,
}: PostLoginProps) => {
  const { userId, password } = data;
  try {
    const res = await Axios.post('/api/auth/sign-in', {
      userId,
      password,
    });
    callbackFunction(res.data);
  } catch (error) {
    if (axios.isAxiosError<LoginError>(error) && error.response) {
      handleError(error.response.data);
    }
  }
};
