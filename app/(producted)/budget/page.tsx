import SecondHeader from "@/components/second-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  trendingDownIcon,
  trendingUpIcon,
  walletIcon,
} from "@/lib/icon-center";
import { BadgeCheck, Plus, TriangleAlert } from "lucide-react";
import React from "react";
import BudgetList from "./_components/budget-list";

const page = () => {
  const cardData = [
    {
      title: "Total Expense",
      amount: 200,
      icon: trendingDownIcon,
    },
    {
      title: "Total Income",
      amount: 5000,
      icon: trendingUpIcon,
    },
    {
      title: "On Track",
      amount: 52000,
      icon: BadgeCheck,
    },
    {
      title: "Over Budget",
      amount: 200,
      icon: TriangleAlert,
    },
  ];

  return (
    <>
      <SecondHeader currentPage="Budget">
        <Button
          className={
            "font-normal text-base py-5 px-5 bg-primary text-white hover:bg-primary"
          }>
          <Plus size={50} />
          New Budget
        </Button>
      </SecondHeader>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 place-items-center justify-center">
        {cardData.map(({ amount, icon: Icon, title }, idx) => (
          <Card
            className="max-w-sm w-full p-5 shadow-lg hover:shadow-blue-500"
            key={idx}>
            <div>
              <div className="w-fit">
                <Icon category="home" />
              </div>
              <div className="mt-5">
                <p className="text-gray-400">{title}</p>
                <h1 className="text-4xl font-semibold">₹{amount.toString()}</h1>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <BudgetList />
    </>
  );
};

export default page;
