export interface IUser {
  username: string;
  token: string;
}

export interface IUserLogInFormValues {
  email: string;
  password: string;
}

export interface IUserRegisterFormValues {
  username: string;
  email: string;
  password: string;
}
