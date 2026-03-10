import React from "react";
import TransactionHistory from "./_components/transaction-hisotry";
import TopTransactionsCard from "./_components/top-transactions";
import { TransactionChart } from "./_components/transaction-chart";
import FilterTransactions from "./_components/filter-transaction";

const page = () => {
  return (
    <div>
      <div className="flex md:flex-row flex-col items-start gap-5 w-full">
        <div className="w-[75%] space-y-3">
          <FilterTransactions />
          <TransactionHistory />
        </div>
        <div className="w-[25%] space-y-3">
          <TopTransactionsCard />
          <TransactionChart />
        </div>
      </div>
    </div>
  );
};

export default page;
