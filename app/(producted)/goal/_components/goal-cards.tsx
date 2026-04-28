"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import completedIcon from "@/sources/icons/completed.png";
import moneyIcon from "@/sources/icons/money.png";
import targetIcon from "@/sources/icons/target.png";
import incomeIcon from "@/sources/icons/income.png";
import { goalStatusCount } from "../_actions/goal-status";
import { useEffect, useState } from "react";
import ButtonLoading from "@/components/loaders/ButtonLoading";

const GoalCards = () => {
  const [goalDash, setGoalDash] = useState({
    COMPLETED: 0,
    INACTIVE: 0,
    ACTIVE: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    goalStatusCount()
      .then((res) => {
        setIsLoading(true);
        console.log(res);
        setGoalDash(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex md:flex-nowrap flex-wrap items-center md:justify-between justify-center gap-5">
      <Card className="max-w-lg w-full p-5 shadow-lg hover:shadow-blue-500">
        <div className="flex h-fit justify-between items-start">
          <div>
            <Image src={targetIcon} alt="image" height={50} width={50} />
            <div className="mt-5">
              <p className="text-gray-400">Active Goals</p>
              <h1 className="text-4xl font-semibold">
                {goalDash.ACTIVE ?? "0"}
              </h1>
            </div>
          </div>
          <h1 className="bg-linear-to-r from-cyan-500 to-blue-500 w-fit p-2 text-lg font-normal rounded-lg">
            Active
          </h1>
        </div>
      </Card>
      <Card className="max-w-lg w-full p-5 shadow-lg hover:shadow-blue-500">
        <div className="flex h-fit justify-between items-start">
          <div>
            <Image src={moneyIcon} alt="image" height={50} width={50} />
            <div className="mt-5">
              <p className="text-gray-400">Completed</p>
              <h1 className="text-4xl font-semibold">
                {isLoading ? <ButtonLoading /> : (goalDash.COMPLETED ?? "0")}
              </h1>
            </div>
          </div>
          <h1 className="bg-linear-to-r from-teal-500 to-teal-500 w-fit p-2 text-lg font-normal rounded-lg">
            +25%
          </h1>
        </div>
      </Card>
      <Card className="max-w-lg w-full p-5 shadow-lg hover:shadow-blue-500">
        <div className="flex h-fit justify-between items-start">
          <div>
            <Image src={completedIcon} alt="image" height={50} width={50} />
            <div className="mt-5">
              <p className="text-gray-400">Total Saved</p>
              <h1 className="text-4xl font-semibold">$4,290</h1>
            </div>
          </div>
          <h1 className="bg-linear-to-r from-red-500 to-orange-500 w-fit p-2 text-lg font-normal rounded-lg">
            PROGRESS
          </h1>
        </div>
      </Card>
      <Card className="max-w-lg w-full p-5 shadow-lg hover:shadow-blue-500">
        <div className="flex h-fit justify-between items-start">
          <div>
            <Image src={incomeIcon} alt="image" height={50} width={50} />
            <div className="mt-5">
              <p className="text-gray-400">Income</p>
              <h1 className="text-4xl font-semibold">
                {goalDash?.INACTIVE ?? 0}
              </h1>
            </div>
          </div>
          <h1 className="bg-linear-to-r from-teal-500 to-teal-500 w-fit p-2 text-lg font-normal rounded-lg">
            68%
          </h1>
        </div>
      </Card>
    </div>
  );
};

export default GoalCards;
