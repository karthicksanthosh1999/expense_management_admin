"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import completedIcon from "@/sources/icons/completed.png";
import moneyIcon from "@/sources/icons/money.png";
import targetIcon from "@/sources/icons/target.png";
import incomeIcon from "@/sources/icons/income.png";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { topFiveTransaction } from "../_actions/top_transaction";
import { useEffect, useState } from "react";
import { Decimal } from "@prisma/client/runtime/client";
import { ITransaction } from "@/constants/transactionsTypes";

const TopTransactionsCard = () => {
  const [topTransactions, setTopTransactions] = useState<ITransaction[] | null>(
    null,
  );

  const topTransaction = async () => {
    const transactions = await topFiveTransaction();
    if (transactions) {
      setTopTransactions(transactions);
    }
  };

  useEffect(() => {
    topTransaction();
  }, []);
  console.log(topTransactions);
  return (
    <Card className="w-full h-125 ">
      <CardContent>
        <CardHeader className="font-textColor font-semibold text-2xl">
          Top Spending
        </CardHeader>
        <Separator className="mt-5" />
        <section className="mt-3 p-5 space-y-5">
          {topTransactions &&
            topTransactions.map((item) => (
              <div className="flex items-center justify-between" key={item.id}>
                <div className="flex items-center gap-5">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={40}
                    height={40}
                  />
                  <div>
                    <h1 className="font-semibold text-sm">{item.category}</h1>
                    <p className="text-gray-400 text-xs">
                      {item.transactionType}
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
