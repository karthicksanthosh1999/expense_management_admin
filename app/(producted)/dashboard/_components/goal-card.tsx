import { Card, CardContent } from "@/components/ui/card";
import { laptopIcon } from "@/lib/icon-center";
import Link from "next/link";
import "./index.css";

const GoalCard = () => {
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
        <div className="space-y-3 mt-5 ">
          {myGoalData.map(
            ({ currentAmount, goalAmount, icon: Icon, id, title }) => (
              <div
                key={id}
                className="flex flex-col items-center justify-between border border-blue-900 hover:border-primary p-5 rounded-xl transaction ease-in-out duration-500 hover:translate-y-1">
                <div className="flex items-center gap-5 w-full">
                  <Icon size={30} />
                  <div className="flex flex-col w-full space-y-5">
                    <div className="flex items-center justify-between w-full">
                      <h1 className="text-color text-lg font-semibold tracking-wider">
                        {title}
                      </h1>
                      <p className="text-gray-400 tracking-wider">
                        {currentAmount} of {goalAmount}
                      </p>
                    </div>
                    <div className="w-full">
                      <div className="h-2 rounded-lg w-[90%] bg-neutral-200 dark:bg-neutral-600">
                        <div
                          className="h-2 bg-primary rounded-lg progress-fill"
                          style={{ width: "45%" }}></div>
                      </div>
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
