export interface IUser {
  name: string;
  mobile: string;
  email: string;
  password: string;
  id: string;
  verifiedEmail?: boolean;
  profileImage?: string;
}

export interface IDecodeUser {
  data: IUser;
  message: string;
}


export interface IOTPTypes {
  email : string,
  otp : string,
}