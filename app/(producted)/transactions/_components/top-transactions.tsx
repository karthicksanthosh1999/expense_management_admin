"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CategoryIcon } from "@/lib/icon-center";
import DataLoader from "@/components/loders/DataLoader";
import { useTopTransactionHook } from "../_hooks/transaction-hook";

const TopTransactionsCard = () => {
  const { data: topTransactions, isLoading } = useTopTransactionHook();
  return (
    <Card className="w-full h-125">
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
        <section className="mt-3 md:p-5 p-0 space-y-5">
          {topTransactions && topTransactions.data.length === 0 ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              No Transaction Found
            </div>
          ) : (
            topTransactions &&
            topTransactions.data.map((item) => (
              <div
                className="flex items-center justify-between"
                key={item.category}>
                <div className="flex items-center gap-5">
                  <CategoryIcon
                    category={item.category.toLowerCase()}
                    size={30}
                  />
                  <div>
                    <h1 className="font-semibold text-sm capitalize">
                      {item.category}
                    </h1>
                    <p className="text-gray-400 text-xs">Expense</p>
                  </div>
                </div>
                <div>
                  <h1 className="font-textColor font-semibold md:text-xl text-base">
                    ${item.amount.toString()}
                  </h1>
                </div>
              </div>
            ))
          )}
        </section>
      </CardContent>
    </Card>
  );
};

export default TopTransactionsCard;
