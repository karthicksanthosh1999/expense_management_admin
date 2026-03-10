import { Card, CardContent, CardHeader } from "@/components/ui/card";
import completedIcon from "@/sources/icons/completed.png";
import moneyIcon from "@/sources/icons/money.png";
import targetIcon from "@/sources/icons/target.png";
import incomeIcon from "@/sources/icons/income.png";
import StatusChip from "@/components/status-chip";
import Image from "next/image";

const TopTransactionsCard = () => {
  const topTransactions = [
    {
      id: 0,
      icon: incomeIcon,
      title: "Starbucks",
      transactionsCount: 12,
      amount: 240.0,
    },
    {
      id: 2,
      icon: completedIcon,
      title: "Starbucks",
      transactionsCount: 12,
      amount: 240.0,
    },
    {
      id: 3,
      icon: moneyIcon,
      title: "Starbucks",
      transactionsCount: 12,
      amount: 240.0,
    },
    {
      id: 4,
      icon: incomeIcon,
      title: "Starbucks",
      transactionsCount: 12,
      amount: 240.0,
    },
    {
      id: 5,
      icon: targetIcon,
      title: "Starbucks",
      transactionsCount: 12,
      amount: 240.0,
    },
    {
      id: 6,
      icon: incomeIcon,
      title: "Starbucks",
      transactionsCount: 12,
      amount: 240.0,
    },
    {
      id: 7,
      icon: incomeIcon,
      title: "Starbucks",
      transactionsCount: 12,
      amount: 240.0,
    },
  ];

  return (
    <Card className="max-w-[35%] w-full h-125 ">
      <CardContent>
        <CardHeader className="font-textColor font-semibold text-2xl">
          Top Merchants
        </CardHeader>
        <section className="mt-3 p-5 space-y-5">
          {topTransactions.map((item) => (
            <div className="flex items-center justify-between" key={item.id}>
              <div className="flex items-center gap-5">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                />
                <div>
                  <h1 className="font-semibold text-sm">{item.title}</h1>
                  <p className="text-gray-400 text-xs">
                    {item.transactionsCount} transactions
                  </p>
                </div>
              </div>
              <div>
                <h1 className="font-textColor font-semibold text-xl">
                  ${item.amount}
                </h1>
              </div>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  );
};

export default TopTransactionsCard;
