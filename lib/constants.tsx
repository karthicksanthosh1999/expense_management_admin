export interface ICommonModel {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export type TFormMode = "CREATE" | "UPDATE";
export type TTransactionType = "EXPENSE" | "INCOME";
export type TTransactionStatus = "Completed" | "Pending";

export interface IApiResponse<T> {
  message: string;
  statusCode: number;
  status: boolean;
  data: T;
}
