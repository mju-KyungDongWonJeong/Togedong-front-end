export interface SignupResponse {
  data: SignupData;
  message: string;
  status: string;
}

interface SignupData {
  userId: string;
  userName: string;
}

export interface SignupError {
  status: number;
  code: string;
  cause: string;
  validation?: ErrorValidation[];
}

interface ErrorValidation {
  field: string;
  message: string;
}
