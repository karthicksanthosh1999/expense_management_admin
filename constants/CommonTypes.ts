export interface IModelPropsType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export type TTransactionType = "INCOME" | "EXPENSE" | "ALL";
