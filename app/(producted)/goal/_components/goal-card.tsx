import { Card, CardAction, CardContent } from "@/components/ui/card";
import moneyIcon from "@/sources/icons/money.png";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Delete, Edit, Trash, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Field, FieldLabel } from "@/components/ui/field";
import { IGoalType } from "@/constants/goalTypes";

const GoalCard = ({
  goalAmount,
  goalStatus,
  title,
  currentAmount,
}: IGoalType) => {
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
                  <Badge variant="secondary" className="uppercase text-xs">
                    {goalStatus}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Trash2
                  size={20}
                  className="hover:text-gray-500 cursor-pointer transaction ease-in-out duration-300 "
                />
                <Edit
                  size={20}
                  className="hover:text-gray-500 cursor-pointer transaction ease-in-out duration-300 "
                />
              </div>
            </div>
            <div className="mt-8">
              <Field className="w-full">
                <FieldLabel htmlFor="progress-upload">
                  <span className="text-gray-400">progress</span>
                  <span className="ml-auto text-black dark:text-white">
                    66%
                  </span>
                </FieldLabel>
                <Progress
                  value={66}
                  id="progress-upload"
                  className={"w-full"}
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
          </CardAction>
        </CardContent>
      </Card>
    </>
  );
};

export default GoalCard;
