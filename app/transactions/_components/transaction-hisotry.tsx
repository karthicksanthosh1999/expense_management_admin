import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import completedIcon from "@/sources/icons/completed.png";
import moneyIcon from "@/sources/icons/money.png";
import targetIcon from "@/sources/icons/target.png";
import incomeIcon from "@/sources/icons/income.png";
import StatusChip from "@/components/status-chip";
import { Separator } from "@/components/ui/separator";
import CustomPagination from "@/components/curtom-pagination";

const TransactionHistory = () => {
  const transactionData = [
    {
      title: "Gas Station",
      transactionType: "Expense",
      transactionDate: "2026-01-02",
      status: "Completed",
      amount: "56.00",
      category: "travel",
      description: "Fuel refill",
      icon: targetIcon,
    },
    {
      title: "Gym",
      transactionType: "Income",
      transactionDate: "2026-01-02",
      status: "Pending",
      amount: "56.00",
      category: "Health",
      description: "Gym Fees",
      icon: completedIcon,
    },
  ];

  return (
    <Card className="w-full h-[1000px]">
      <CardContent>
        <CardHeader className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-color">
            Transaction History
          </h1>
          <p className="text-gray-400">Showing 1-8 of 16 transactions</p>
        </CardHeader>
        <Separator className={"my-5"} />
        <section className="space-y-3">
          {transactionData.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border border-blue-900 hover:border-primary p-3 cursor-pointer rounded-xl transaction ease-in-out duration-500 hover:translate-y-1">
              <div className="flex items-center gap-5">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={65}
                  height={65}
                />
                <div className="flex flex-col items-start">
                  <h1 className="text-color text-lg font-semibold tracking-wider">
                    {item.title}
                  </h1>
                  <p className="text-gray-400 tracking-wider">
                    {item.transactionDate}
                  </p>
                </div>
              </div>
              <div>
                <h1
                  className="text-lg font-semibold"
                  style={{
                    color:
                      item.transactionType === "Expense"
                        ? "#fb2c36"
                        : "oklch(72.3% 0.219 149.579)",
                  }}>
                  ${item.amount}
                </h1>
                <p className="text-color text-lg font-semibold">
                  <StatusChip status={item.status} />
                </p>
              </div>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
