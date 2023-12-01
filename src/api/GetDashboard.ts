import axios from 'axios';
import {
  DashboardError,
  DashboardResponse,
} from '../assets/type/GetDashboardPayload';
import { Axios } from './Axios';

interface GetDashboardProps {
  userName?: string;
  handleDashboardData: (data: DashboardResponse) => void;
  handleDashboardError: (error: DashboardError) => void;
}

export const GetDashboard = async ({
  userName,
  handleDashboardData,
  handleDashboardError,
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

    handleDashboardData(res.data.data);
  } catch (error) {
    if (axios.isAxiosError<DashboardError>(error) && error.response) {
      handleDashboardError(error.response.data);
    }
  }
};
