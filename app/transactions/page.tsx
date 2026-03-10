import React from "react";
import TransactionHistory from "./_components/transaction-hisotry";
import TopTransactionsCard from "./_components/top-transactions";

const page = () => {
  return (
    <div>
      <div className="flex md:flex-row flex-col items-start gap-5">
        <TransactionHistory />
        <TopTransactionsCard />
      </div>
    </div>
  );
};

export default page;
