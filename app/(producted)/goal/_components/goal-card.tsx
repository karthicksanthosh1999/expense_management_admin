"use client";

import { Card, CardAction, CardContent } from "@/components/ui/card";
import moneyIcon from "@/sources/icons/money.png";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Field, FieldLabel } from "@/components/ui/field";
import { IGoalType } from "@/constants/goalTypes";
import DeleteModel from "@/components/delete-model";
import { useState } from "react";
import { useDeleteGoalHook } from "../_hooks/goal-hook";
import { Button } from "@/components/ui/button";
import { GoalAmountForm } from "./goal-amount-form";
import { GoalAmountTimeline } from "./goal-timeline";
import GoalModel from "./goal-model";

const GoalCard = ({
  id,
  goalAmount,
  goalStatus,
  title,
  userId,
  currentAmount,
}: IGoalType) => {
  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const [addAmountModelOpen, setAddAmountModelOpen] = useState(false);
  const [historyModelOpen, setHistoryModelOpen] = useState(false);
  const [updateGoalModelOpen, setUpdateGoalModelOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<IGoalType | null>(null);

  // HOOKS
  const { mutate } = useDeleteGoalHook();

  const confirmDelete = () => {
    if (id) {
      mutate({ id });
      setDeleteModelOpen(false);
    }
  };

  const percentage =
    goalAmount && Number(goalAmount) > 0
      ? Math.min(
          100,
          Math.round((Number(currentAmount || 0) / Number(goalAmount)) * 100),
        )
      : 0;

  const handleGoal = () => {
    setUpdateGoalModelOpen(true);
    setSelectedGoal({
      goalAmount,
      goalStatus,
      title,
      userId,
      currentAmount,
      id,
    });
  };

  return (
    <>
      <Card className="w-full max-w-md shadow-sm hover:shadow-blue-500">
        <CardContent>
          <CardAction className="w-full cursor-pointer">
            <div className="flex items-center gap-5 justify-between">
              <div className="flex items-center gap-5">
                <Image src={moneyIcon} alt="icons" width={50} height={50} />
                <div className="">
                  <h1 className="text-xl font-semibold">{title}</h1>
                  <Badge
                    variant="default"
                    className="uppercase text-white text-xs p-3 mt-2">
                    {goalStatus}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Trash2
                  size={20}
                  onClick={() => setDeleteModelOpen(true)}
                  className="hover:text-gray-500 cursor-pointer transaction ease-in-out duration-300 "
                />
                <Edit
                  size={20}
                  onClick={() => handleGoal()}
                  className="hover:text-gray-500 cursor-pointer transaction ease-in-out duration-300 "
                />
              </div>
            </div>
            <div className="mt-8">
              <Field className="w-full">
                <FieldLabel htmlFor="progress-upload">
                  <span className="text-gray-400">progress</span>
                  <span className="ml-auto text-black dark:text-white">
                    {percentage}%
                  </span>
                </FieldLabel>
                <Progress
                  value={percentage}
                  id="progress-upload"
                  className="w-full"
                />
              </Field>
            </div>
            <div className="flex items-center justify-between mt-5">
              <div>
                <p className="text-gray-400">Current</p>
                <h1 className="text-color text-xl font-semibold">
                  ₹{currentAmount ?? 0}
                </h1>
              </div>
              <div>
                <p className="text-gray-400">Target</p>
                <h1 className="text-color text-xl font-semibold">
                  ₹{goalAmount.toString() ?? 0}
                </h1>
              </div>
            </div>
            <div className="space-x-3 mt-5">
              <Button
                className="text-gray-200 p-4 text-sm"
                onClick={() => setAddAmountModelOpen(true)}>
                Add Amount
              </Button>
              <Button
                variant={"outline"}
                className="p-4 text-sm"
                onClick={() => setHistoryModelOpen(true)}>
                Details
              </Button>
            </div>
          </CardAction>
        </CardContent>
        <DeleteModel
          open={deleteModelOpen}
          setOpen={setDeleteModelOpen}
          name="Goal"
          deleteDataId={id!}
          handleDelete={confirmDelete}
        />
        {id && (
          <>
            <GoalAmountForm
              open={addAmountModelOpen}
              setOpen={setAddAmountModelOpen}
              goalId={id}
            />
            <GoalAmountTimeline
              open={historyModelOpen}
              setOpen={setHistoryModelOpen}
              goalId={id}
            />
          </>
        )}
        {selectedGoal && (
          <GoalModel
            mode="UPDATE"
            open={updateGoalModelOpen}
            setOpen={setUpdateGoalModelOpen}
            existingGoalData={selectedGoal}
          />
        )}
      </Card>
    </>
  );
};

export default GoalCard;
