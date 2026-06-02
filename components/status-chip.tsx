import { TTransactionType } from "@/constants/CommonTypes";

type TProps = { status: TTransactionType };

const StatusChip = ({ status }: TProps) => {
  switch (status) {
    case "EXPENSE":
      return (
        <p className="text-violet-500 text-xs sm:text-sm p-2 rounded-lg border border-primary">
          EXPENSE
        </p>
      );
    case "INCOME":
      return (
        <p className="text-green-500 text-xs sm:text-sm p-2 rounded-lg border border-green-500">
          INCOME
        </p>
      );
    case "ALL":
      return (
        <p className="text-green-500 text-xs sm:text-sm p-2 rounded-lg border border-green-500">
          Income
        </p>
      );
  }
};

export default StatusChip;
