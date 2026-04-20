"use client";
import GoalCard from "./goal-card";
import { useFilterGoals } from "../_hooks/goal-hook";
import { useEffect, useState } from "react";
import { IGoalFilterType } from "@/constants/goalTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import DataLoader from "@/components/loders/DataLoader";

const GoalList = () => {
  const defaultValues: IGoalFilterType = {
    status: "ALL",
    limit: 10,
    page: 1,
  };

  const [appliedFilters, setAppliedFilters] =
    useState<IGoalFilterType>(defaultValues);
  const [filters, setFilters] = useState<IGoalFilterType>(defaultValues);

  const { data: goalList, isLoading } = useFilterGoals(appliedFilters);

  const updateFilter = (key: string, value: any) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    setAppliedFilters(updated);
  };

  console.log(goalList);
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
      title: "ACTIVE",
      value: "ACTIVE",
    },
    {
      id: "2",
      title: "INACTIVE",
      value: "INACTIVE",
    },
    {
      id: "3",
      title: "COMPLETED",
      value: "COMPLETED",
    },
  ];

  return (
    <div>
      <Card className="p-4">
        <CardContent className="space-y-4 flex  items-center justify-between">
          <div className="h-full flex flex-col justify-start items-start space-y-3">
            <Label>Transaction Type:</Label>
            <div className="flex flex-wrap gap-3">
              {tabsList.map((item) => {
                const isActive = filters.status === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => updateFilter("status", item.value)}
                    className={`rounded-xl border px-4 py-2 text-sm border-primary font-medium transition cursor-pointer ${
                      isActive ? "bg-primary text-white" : "hover:bg-input/40"
                    }`}>
                    {item.title}
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="relative">
        {isLoading && (
          <div className="absolute top-1 left-0 w-full">
            <DataLoader />
          </div>
        )}
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-5 place-content-center justify-center w-full">
        {goalList && goalList.goals.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen">
            No Goals Found
          </div>
        ) : (
          goalList &&
          goalList.goals.map((item) => (
            <div key={item.id} className="w-full">
              <GoalCard
                goalAmount={item.goalAmount}
                goalStatus={item.goalStatus}
                title={item.title}
                currentAmount={item.currentAmount}
                userId={item.userId}
                id={item?.id}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GoalList;
