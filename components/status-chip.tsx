import { TTransactionStatus } from "@/lib/constants";

type TProps = {
  status: TTransactionStatus;
};

const StatusChip = ({ status }: TProps) => {
  switch (status) {
    case "Pending":
      return (
        <p className="text-violet-500 text-sm p-2 rounded-lg border border-primary">
          Pending
        </p>
      );
    case "Completed":
      return (
        <p className="text-color text-sm font-semibold bg-linear-to-r from-green-500 to-cyan-400 p-2 rounded-lg w-fit">
          Completed
        </p>
      );
  }
};

export default StatusChip;
