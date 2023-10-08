export interface UserInput {
  name: string | StringFilter<"User">;
  password: string;
}

export interface UserPayload {
  name: string | StringFilter<"User">;
  email: string;
}

export interface UserRegister {
  name: string | StringFilter<"User">;
  email: string;
  password: string;
}
