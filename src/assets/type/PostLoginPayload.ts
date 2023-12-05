export interface LoginResponse {
  data: Data;
  message: string;
  status: string;
}

interface Data {
  accessToken: string;
  userName: string;
}

export interface LoginError {
  status: number;
  code: string;
  cause: string;
  validation?: ErrorValidation[];
}

interface ErrorValidation {
  field: string;
  message: string;
}
