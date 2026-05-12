import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { topGoalList } from "../_actions/goal-list";
import "./index.css";

const GoalCard = async () => {
  const goalList = await topGoalList();

  return (
    <Card className="w-full">
      <CardContent className="h-63.75 overflow-auto">
        <div className="flex items-center  justify-between">
          <h1 className="text-textColor text-lg font-semibold">My Goal</h1>
          <Link href={"/goal"} className="hover:text-text-Color">
            <h1 className="text-gray-400 text-sm">See All</h1>
          </Link>
        </div>
        <Separator />
        <div className="space-y-3 mt-5 ">
          {goalList.map(
            ({ currentAmount, goalAmount, id, title, percentage }) => (
              <div
                key={id}
                className="flex flex-col items-center justify-between border border-blue-900 hover:border-primary p-5 rounded-xl transaction ease-in-out duration-500 hover:translate-y-1">
                <div className="flex items-center gap-5 w-full">
                  {/* <Icon size={30} /> */}
                  <div className="flex flex-col w-full space-y-5">
                    <div className="flex items-center justify-between w-full">
                      <h1 className="text-color text-lg font-semibold tracking-wider">
                        {title}
                      </h1>
                      <p className="text-gray-400 tracking-wider">
                        {Number(currentAmount).toFixed(2)} of{" "}
                        {Number(goalAmount).toFixed(2)}
                      </p>
                    </div>
                    <div className="w-full">
                      <div
                        className="w-full rounded-full h-2 bg-yellow-300 overflow-hidden"
                        style={{ backgroundColor: "#99a1af" }}>
                        <div
                          className="h-full rounded-full bg-highlight relative overflow-hidden progress-fill"
                          style={{ width: `${percentage}%` }}></div>
                      </div>
                      <p className="py-2">{percentage.toFixed(2)}% /100%</p>
                    </div>
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
