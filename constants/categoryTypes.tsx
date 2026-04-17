import { IUser } from "../types/userTypes";

export interface ICategoryTypes {
  id?: string;
  color: string;
  title: string;
}


export interface ICartCategoryFilterType {
  id: string;
  color: string;
  title: string;
  user: Pick<IUser, "id" | "email" | "fullName">
  expenses: {
    amount: number;
    createdAt: string;
    id: string;
    title: string;
  }[];
  createdat: string;
  updatedat: string;
}