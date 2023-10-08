export interface LoginForm {
  username: string;
  password: string;
}

interface User {
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
