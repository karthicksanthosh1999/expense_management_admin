export interface IUser {
  fullname: string;
  mobile: string;
  email: string;
  password: string;
  id: string;
}

export interface IDecodeUser {
  data: IUser;
  message: string;
}
