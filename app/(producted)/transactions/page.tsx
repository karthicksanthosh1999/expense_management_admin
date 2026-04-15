"use client";
import { useState } from "react";
import TopTransactionsCard from "./_components/top-transactions";
import { TransactionChart } from "./_components/transaction-chart";
import FilterTransactions from "./_components/filter-transaction";
import SecondHeader from "@/components/second-header";
import { Button } from "@/components/ui/button";
import { TransactionForm } from "./_components/form-transaction";
import { TTransactionType } from "@/lib/constants";

const page = () => {
  const [transactionFormOpen, setTransactionFormOpen] = useState(false);
  const [selectedFormType, setSelectedFormType] =
    useState<TTransactionType>("EXPENSE");

  const handleTransactionFormOpen = (formType: TTransactionType) => {
    setSelectedFormType(formType);
    setTransactionFormOpen(true);
  };

  return (
    <div>
      <SecondHeader currentPage="Transaction">
        <div className="space-x-3">
          <Button
            className={"text-sm text-textColor p-5"}
            onClick={() => handleTransactionFormOpen("INCOME")}>
            Add Income
          </Button>
          <Button
            className={"text-sm text-textColor p-5"}
            onClick={() => handleTransactionFormOpen("EXPENSE")}>
            Add Expense
          </Button>
        </div>
      </SecondHeader>
      <div className="flex md:flex-row flex-col items-start gap-5 w-full">
        <div className="w-[75%] space-y-3">
          <FilterTransactions />
        </div>
        <div className="w-[25%] space-y-3">
          <TopTransactionsCard />
          <TransactionChart />
        </div>
      </div>
      <TransactionForm
        open={transactionFormOpen}
        setOpen={setTransactionFormOpen}
        formType={selectedFormType}
      />
    </div>
  );
};

export default page;
