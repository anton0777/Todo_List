export type UserResponse = {
  email: string;
  name: string | null;
};

export type CreateUser = {
  email: string;
  name?: string | null;
  password: string;
};

export type UpdateUser = {
  name?: string | null;
  password?: string;
};
