export interface LoginResponse {
  data: Token;
  message: string;
  status: string;
}

interface Token {
  accessToken: string;
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
