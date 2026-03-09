export interface ICommonModel {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export type TFormMode = "CREATE" | "UPDATE";
export type TTransactionType = "Expense" | "Income";
export type TTransactionStatus = "Completed" | "Pending";
