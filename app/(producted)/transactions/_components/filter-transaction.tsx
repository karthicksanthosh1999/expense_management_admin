"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/date-picker";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import TransactionHistory from "./transaction-hisotry";
import { useFilterTransaction } from "../_hooks/transaction-hook";
import { ITransactionFilterType } from "@/constants/transactionsTypes";
import { getDefaultDates } from "@/lib/getCurrentMonth";
import { transactionCategories } from "@/lib/constants";

export default function TransactionFilters() {
  const { endDate, startDate } = getDefaultDates();
  const defaultValues: ITransactionFilterType = {
    type: "ALL",
    startDate,
    endDate,
    category: "all",
    limit: 10,
    page: 1,
  };
  const [appliedFilters, setAppliedFilters] =
    useState<ITransactionFilterType>(defaultValues);
  const [filters, setFilters] = useState<ITransactionFilterType>(defaultValues);

  // HOOKS
  const { data, isLoading } = useFilterTransaction(appliedFilters);

  console.log({ data });

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    setAppliedFilters(filters);
  };

  useEffect(() => {
    setAppliedFilters(filters);
  }, []);

  const tabsList = [
    {
      id: "0",
      title: "All",
      value: "ALL",
    },
    {
      id: "1",
      title: "Income",
      value: "INCOME",
    },
    {
      id: "2",
      title: "Expense",
      value: "EXPENSE",
    },
  ];

  const handleReset = () => {
    setFilters({
      type: "ALL",
      startDate: undefined as Date | undefined,
      endDate: undefined as Date | undefined,
      category: "all",
    });
  };
  return (
    <>
      <Card className="p-4">
        <CardContent className="space-y-4 flex  items-center justify-between">
          <div className="h-full flex flex-col justify-start items-start space-y-3">
            <Label>Transaction Type:</Label>
            <div className="flex flex-wrap gap-3">
              {tabsList.map((item) => {
                const isActive = filters.type === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => updateFilter("type", item.value)}
                    className={`rounded-xl border px-4 py-2 text-sm border-primary font-medium transition cursor-pointer ${
                      isActive ? "bg-primary text-white" : "hover:bg-input/40"
                    }`}>
                    {item.title}
                  </button>
                );
              })}
            </div>

            {/* DATES */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-3">
                <Label>Start Date:</Label>
                <DatePicker
                  value={filters.startDate}
                  onChange={(date) => updateFilter("startDate", date)}
                  className="p-4 font-normal text-base"
                />
              </div>
              <div className="space-y-3">
                <Label>End Date:</Label>
                <DatePicker
                  value={filters.endDate}
                  onChange={(date) => updateFilter("endDate", date)}
                  className="p-4 font-normal text-base"
                />
              </div>
            </div>

            {/* Categories */}
            <Label>Category:</Label>
            <div className="flex flex-wrap gap-3">
              {transactionCategories.map(({ icon: Icon, label, value }) => {
                const isActive = filters.category === value;
                return (
                  <>
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateFilter("category", value)}
                      className={`rounded-xl border px-4 py-2 text-sm flex items-center gap-2 font-medium transition border-primary cursor-pointer ${
                        isActive ? "bg-primary text-white" : "hover:bg-input/40"
                      }`}>
                      {Icon}
                      {label}
                    </button>
                  </>
                );
              })}
            </div>
          </div>

          <Separator orientation="vertical" />

          {/* Submit Button */}
          <div className="space-y-3 flex flex-col w-fit">
            <Button
              variant={"default"}
              onClick={handleSubmit}
              className="bg-primary text-white px-8 text-base py-5 rounded-lg cursor-pointer">
              Apply
            </Button>
            <Button
              onClick={handleReset}
              className="text-white hover:bg-orange-500 bg-orange-400 px-8 text-base py-5 rounded-lg cursor-pointer">
              Reset
            </Button>
            <Button
              onClick={handleReset}
              className="text-white hover:bg-green-500 bg-green-400 px-8 text-base py-5 rounded-lg cursor-pointer">
              Export
            </Button>
          </div>
        </CardContent>
      </Card>
      <div>
        <TransactionHistory loading={isLoading} transactionData={data!} />
      </div>
    </>
  );
}
