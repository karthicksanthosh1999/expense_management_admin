"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { topFiveTransaction } from "../_actions/top_transaction";
import { useEffect, useState } from "react";
import { ITransaction } from "@/constants/transactionsTypes";
import { CategoryIcon } from "@/lib/icon-center";
import DataLoader from "@/components/loders/DataLoader";

const TopTransactionsCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topTransactions, setTopTransactions] = useState<ITransaction[] | null>(
    null,
  );

  const topTransaction = async () => {
    setIsLoading(true);
    const transactions = await topFiveTransaction();
    if (transactions) {
      setTopTransactions(transactions);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    topTransaction();
  }, []);

  return (
    <Card className="w-full h-125 ">
      <CardContent>
        <CardHeader className="font-textColor font-semibold text-2xl">
          Top Spending
        </CardHeader>
        <div className="relative">
          <Separator className={"mt-5"} />
          {isLoading && (
            <div className="absolute top-1 left-0 w-full">
              <DataLoader />
            </div>
          )}
        </div>
        <section className="mt-3 p-5 space-y-5">
          {topTransactions &&
            topTransactions.map((item) => (
              <div className="flex items-center justify-between" key={item.id}>
                <div className="flex items-center gap-5">
                  <CategoryIcon
                    category={item.category.toLowerCase()}
                    size={30}
                  />
                  <div>
                    <h1 className="font-semibold text-sm capitalize">
                      {item.category}
                    </h1>
                    <p className="text-gray-400 text-xs">
                      {item.transactionType}
                    </p>
                  </div>
                </div>
                <div>
                  <h1 className="font-textColor font-semibold text-xl">
                    ${item.amount.toString()}
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
