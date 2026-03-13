"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { laptopIcon } from "@/lib/icon-center";
import Link from "next/link";
import { useEffect, useState } from "react";

const GoalCard = () => {
  const [progress, setProgress] = useState(13);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  const myGoalData = [
    {
      id: "0",
      icon: laptopIcon,
      title: "New Laptop",
      goalAmount: 1500,
      currentAmount: 960,
    },
    {
      id: "1",
      icon: laptopIcon,
      title: "PS5",
      goalAmount: 530,
      currentAmount: 700,
    },
    {
      id: "2",
      icon: laptopIcon,
      title: "New Laptop",
      goalAmount: 930,
      currentAmount: 1500,
    },
  ];

  return (
    <Card className="max-w-[60%] w-full">
      <CardContent>
        <div className="flex items-center  justify-between">
          <h1 className="text-textColor text-lg font-semibold">My Goal</h1>
          <h1 className="text-gray-400 text-sm">
            <Link href={"/goal"} className="hover:text-text-Color">
              See All
            </Link>
          </h1>
        </div>
        <div className="space-y-3">
          {myGoalData.map(
            ({ currentAmount, goalAmount, icon: Icon, id, title }) => (
              <div
                key={id}
                className="flex flex-col items-center justify-between border border-blue-900 hover:border-primary p-3 cursor-pointer rounded-xl transaction ease-in-out duration-500 hover:translate-y-1">
                <div className="flex items-center gap-5 w-full">
                  <Icon />
                  <div className="flex items-center justify-between w-full">
                    <h1 className="text-color text-lg font-semibold tracking-wider">
                      {title}
                    </h1>
                    <p className="text-gray-400 tracking-wider">
                      {currentAmount} of {goalAmount}
                    </p>
                  </div>
                  <div className="h-1 w-[40%] bg-neutral-200 dark:bg-neutral-600">
                    <div
                      className="h-1 bg-primary"
                      style={{ width: "45%" }}></div>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalCard;
