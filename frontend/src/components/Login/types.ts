export interface LoginType {
  email: string;
  password: string;
}

export interface ErrorType {
  response: { data: { message: string } };
}

export interface ValidationErrors {
  email?: string;
  password?: string;
}
