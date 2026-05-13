"use client";

import { FormEventHandler, useState } from "react";
import {
  trendingUpIcon,
  trendingDownIcon,
  walletIcon,
} from "@/lib/icon-center";
import { getDefaultDates } from "@/lib/getCurrentMonth";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DataLoader from "@/components/loders/DataLoader";
import { useOverAllTransactionDetailsHook } from "@/app/(producted)/transactions/_hooks/transaction-hook";

type Filters = {
  startDate: Date | undefined;
  endDate: Date | undefined;
};

const formatAmount = (amount: number = 0) =>
  new Intl.NumberFormat("en-IN").format(amount);

const AmountCard = () => {
  const { startDate: defaultStart, endDate: defaultEnd } = getDefaultDates();

  const [filters, setFilters] = useState({
    startDate: defaultStart,
    endDate: defaultEnd,
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);

  const { data: amountDetails, isLoading } =
    useOverAllTransactionDetailsHook(appliedFilters);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setAppliedFilters(filters);
  };

  const updateFilter = (key: keyof Filters, value: Date | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleReset = () => {
    setFilters({
      startDate: defaultStart,
      endDate: defaultEnd,
    });
  };

  const cardData = [
    {
      title: "Total Expense",
      amount: amountDetails?.data?.expense ?? 0,
      icon: trendingDownIcon,
      iconCategory: "expense" as const,
    },
    {
      title: "Total Income",
      amount: amountDetails?.data?.income ?? 0,
      icon: trendingUpIcon,
      iconCategory: "income" as const,
    },
    {
      title: "Total Amount",
      amount: amountDetails?.data?.balance ?? 0,
      icon: walletIcon,
      iconCategory: "total" as const,
    },
    {
      title: "Balance",
      amount: amountDetails?.data?.balance ?? 0,
      icon: walletIcon,
      iconCategory: "balance" as const,
    },
  ];

  return (
    <div>
      <h1 className="text-fontColor text-xl font-semibold">Filter</h1>
      <Card className="mt-3">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              <div className="space-y-2 flex gap-5 items-center">
                <Label>Start Date:</Label>
                <DatePicker
                  value={filters.startDate}
                  onChange={(date) => updateFilter("startDate", date)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2 flex gap-5 items-center">
                <Label>End Date:</Label>
                <DatePicker
                  value={filters.endDate}
                  onChange={(date) => updateFilter("endDate", date)}
                  className="w-full"
                />
              </div>

              <div className="flex items-end gap-2 h-full">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 text-white text-sm h-full font-normal">
                  Apply
                </Button>

                <Button
                  type="button"
                  onClick={handleReset}
                  className="bg-orange-400 hover:bg-orange-500 text-sm text-white px-8 h-full font-normal">
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <h1 className="text-fontColor text-xl font-semibold mt-5">
        Transactions
      </h1>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-3">
        {cardData.map(({ amount, icon: Icon, title, iconCategory }, idx) => (
          <Card key={idx} className="w-full p-5 shadow-lg">
            <div className="space-y-3">
              <div className="space-y-2 flex items-center gap-2">
                <Icon category={iconCategory} />
                <p className="text-gray-400">{title}</p>
              </div>
              <div className="relative">
                <Separator />
                {isLoading && <DataLoader />}
              </div>
              <h1 className="text-3xl font-semibold">
                ₹{formatAmount(amount)}
              </h1>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AmountCard;
