import { TTransactionType } from "@/constants/CommonTypes";

type TProps = { status: TTransactionType };

const StatusChip = ({ status }: TProps) => {
  switch (status) {
    case "EXPENSE":
      return (
        <p className="text-violet-500 text-sm p-2 rounded-lg border border-primary">
          EXPENSE
        </p>
      );
    case "INCOME":
      return (
        <p className="text-color text-sm font-semibold bg-linear-to-r from-green-500 to-cyan-400 p-2 rounded-lg w-fit">
          Income
        </p>
      );
    case "ALL":
      return (
        <p className="text-color text-sm font-semibold bg-linear-to-r from-green-500 to-cyan-400 p-2 rounded-lg w-fit">
          Income
        </p>
      );
  }
};

export default StatusChip;
