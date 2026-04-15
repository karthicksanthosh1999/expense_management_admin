"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/date-picker";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import TransactionHistory from "./transaction-hisotry";
import { useFilterTransaction } from "../_hooks/transaction-hook";
import { ITransactionFilterType } from "@/constants/transactionsTypes";
import { getDefaultDates } from "@/lib/getCurrentMonth";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "food", label: "Food" },
  { value: "travel", label: "Travel" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "snakes", label: "Snakes" },
  { value: "income", label: "Income" },
];

export default function TransactionFilters() {
  const { endDate, startDate } = getDefaultDates();
  const [appliedFilters, setAppliedFilters] = useState<ITransactionFilterType>({
    type: "ALL",
    startDate,
    endDate,
    category: "all",
    limit: 10,
    page: 1,
  });

  const [filters, setFilters] = useState<ITransactionFilterType>({
    type: "ALL",
    startDate,
    endDate,
    category: "all",
    limit: 10,
    page: 1,
  });

  const { data, isLoading } = useFilterTransaction(appliedFilters);

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    setAppliedFilters(filters);
    console.log("Filters:", filters);
  };

  useEffect(() => {
    setAppliedFilters(filters);
    console.log(data);
  }, []);

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
            {/* Tabs */}
            <Tabs
              value={filters.type}
              onValueChange={(val) => updateFilter("type", val)}>
              <TabsList className="grid grid-cols-3 border rounded-xl">
                <TabsTrigger className={"cursor-pointer"} value="All">
                  All
                </TabsTrigger>
                <TabsTrigger className={"cursor-pointer"} value="INCOME">
                  Income
                </TabsTrigger>
                <TabsTrigger className={"cursor-pointer"} value="EXPENSE">
                  Expenses
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* DATES */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-3">
                <Label>Start Date:</Label>
                <DatePicker
                  value={filters.startDate}
                  onChange={(date) => updateFilter("startDate", date)}
                />
              </div>
              <div className="space-y-3">
                <Label>End Date:</Label>
                <DatePicker
                  value={filters.endDate}
                  onChange={(date) => updateFilter("endDate", date)}
                />
              </div>
            </div>

            {/* Categories */}
            <Label>Category:</Label>
            <div className="flex flex-wrap gap-3">
              {categories.map((item) => {
                const isActive = filters.category === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => updateFilter("category", item.value)}
                    className={`rounded-xl border px-4 py-2 text-sm font-medium transition cursor-pointer ${
                      isActive
                        ? "bg-primary text-white border-primary"
                        : "hover:bg-input/40"
                    }`}>
                    {item.label}
                  </button>
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
          </div>
        </CardContent>
      </Card>
      <div>
        <TransactionHistory
          isLoading={isLoading}
          transactionData={data ?? []}
        />
      </div>
    </>
  );
}
