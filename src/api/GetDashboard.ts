import axios from 'axios';
import {
  DashboardError,
  DashboardResponse,
} from '../assets/type/GetDashboardPayload';
import { Axios } from './Axios';

interface GetDashboardProps {
  userName?: string;
  callbackFunction: (data: DashboardResponse) => void;
  handleError: (error: DashboardError) => void;
}

export const GetDashboard = async ({
  userName,
  callbackFunction,
  handleError,
}: GetDashboardProps) => {
  try {
    const res = await Axios.get(`api/dash-board/${userName}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      params: {
        userName,
      },
    });

    callbackFunction(res.data.data);
  } catch (error) {
    if (axios.isAxiosError<DashboardError>(error) && error.response) {
      handleError(error.response.data);
    }
  }
};
