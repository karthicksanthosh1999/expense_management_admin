"use client";
import { Card } from "@/components/ui/card";
import ButtonLoading from "@/components/loders/ButtonLoading";
import { CheckCheck, Crosshair, Sigma, X } from "lucide-react";
import { useGetDashboardAmountHook } from "../_hooks/goal-hook";

const GoalCards = () => {
  const { data: goalDash, isLoading } = useGetDashboardAmountHook();

  return (
    <div className="flex md:flex-nowrap flex-wrap items-center md:justify-between justify-center gap-5">
      <Card className="max-w-lg w-full p-5 shadow-lg hover:shadow-blue-500">
        <div className="flex h-fit justify-between items-start">
          <div>
            <Sigma
              size={45}
              className="rounded-lg p-2 bg-linear-to-r from-green-600 to-green-500"
            />
            <div className="mt-5">
              <p className="text-gray-400">Total</p>
              <h1 className="text-4xl font-semibold">
                {isLoading ? (
                  <ButtonLoading />
                ) : (
                  (goalDash?.data?.ACTIVE ?? "0")
                )}
              </h1>
            </div>
          </div>
          <h1 className="bg-linear-to-r from-green-600 to-green-500 w-fit p-2 text-sm font-semibold rounded-lg uppercase">
            total
          </h1>
        </div>
      </Card>
      <Card className="max-w-lg w-full p-5 shadow-lg hover:shadow-blue-500">
        <div className="flex h-fit justify-between items-start">
          <div>
            <Crosshair
              size={45}
              className="rounded-lg p-2 bg-linear-to-r from-blue-500 to-blue-500"
            />
            <div className="mt-5">
              <p className="text-gray-400">Active Goals</p>
              <h1 className="text-4xl font-semibold">
                {isLoading ? (
                  <ButtonLoading />
                ) : (
                  (goalDash?.data?.ACTIVE ?? "0")
                )}
              </h1>
            </div>
          </div>
          <h1 className="bg-linear-to-r from-blue-500 to-blue-500 w-fit p-2 text-sm font-semibold  rounded-lg uppercase">
            Active
          </h1>
        </div>
      </Card>
      <Card className="max-w-lg w-full p-5 shadow-lg hover:shadow-blue-500">
        <div className="flex h-fit justify-between items-start">
          <div>
            <CheckCheck
              size={45}
              className="rounded-lg p-2 bg-linear-to-r from-yellow-600 to-yellow-500"
            />
            <div className="mt-5">
              <p className="text-gray-400">Completed</p>
              <h1 className="text-4xl font-semibold">
                {isLoading ? (
                  <ButtonLoading />
                ) : (
                  (goalDash?.data?.COMPLETED ?? "0")
                )}
              </h1>
            </div>
          </div>
          <h1 className="bg-linear-to-r from-yellow-600 to-yellow-500 w-fit p-2 text-sm font-semibold rounded-lg uppercase">
            Completed
          </h1>
        </div>
      </Card>
      <Card className="max-w-lg w-full p-5 shadow-lg hover:shadow-blue-500">
        <div className="flex h-fit justify-between items-start">
          <div>
            <X
              size={45}
              className="rounded-lg p-2 bg-linear-to-r from-red-500 to-orange-500"
            />
            <div className="mt-5">
              <p className="text-gray-400">Inactive</p>
              <h1 className="text-4xl font-semibold">
                {isLoading ? (
                  <ButtonLoading />
                ) : (
                  (goalDash?.data?.INACTIVE ?? "0")
                )}
              </h1>
            </div>
          </div>
          <h1 className="bg-linear-to-r from-red-500 to-orange-500 w-fit p-2 text-sm font-semibold rounded-lg uppercase">
            inactive
          </h1>
        </div>
      </Card>
    </div>
  );
};

export default GoalCards;
