import {
  Car,
  Hamburger,
  Home,
  LayoutDashboard,
  ShoppingBag,
  Utensils,
} from "lucide-react";

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
export const transactionCategories = [
  {
    icon: <LayoutDashboard size={18} />,
    label: "All",
    value: "all",
  },
  {
    icon: <Car size={18} />,
    label: "Travel",
    value: "transport",
  },
  {
    icon: <Utensils size={18} />,
    label: "Food",
    value: "food",
  },
  {
    icon: <ShoppingBag size={18} />,
    label: "Shopping",
    value: "shopping",
  },
  {
    icon: <Hamburger size={18} />,
    label: "Snacks",
    value: "snacks",
  },
  {
    icon: <Home size={18} />,
    label: "Rent",
    value: "rent",
  },
];
