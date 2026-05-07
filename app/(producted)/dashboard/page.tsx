import GoalCard from "./_components/goal-card";
import {
  calenderIcon,
  pieChartIcon,
  trendingUpIcon,
  trendingDownIcon,
  walletIcon,
} from "@/lib/icon-center";
import Link from "next/link";
import { transactionAmount } from "./_actions/transactionAmount";
import TopTransactionsCard from "../transactions/_components/top-transactions";
import AiSuggestionCard from "./_components/ai_suggestion";
import { Suspense } from "react";
import AiSuggestionCardSkeleton from "@/components/loders/AiCardSkalitonLoader";
import { BotMessageSquare, ComputerIcon, Goal } from "lucide-react";
import aiIcon from "@/sources/icons/ai.png";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import AmountCard from "./_components/amount-card";
import { AmountChart } from "./_components/amount-chart";

const page = async () => {
  const quickAction = [
    {
      id: "0",
      link: "",
      icon: Goal,
      title: "Goal",
      description: "Create a new saving goal",
    },
    {
      id: "1",
      link: "",
      icon: trendingUpIcon,
      title: "View Badges",
      description: "See all achievements",
    },
    {
      id: "2",
      link: "",
      icon: calenderIcon,
      title: "Schedule Bills",
      description: "Manage payments",
    },
    {
      id: "3",
      link: "",
      icon: pieChartIcon,
      title: "View Report",
      description: "Detailed insights",
    },
  ];
  return (
    <>
      <AmountCard />
      {/* QUICK ACTION CARD */}
      <h1 className="text-fontColor text-xl font-semibold">Quick Action</h1>
      <div className="grid grid-cols-4 gap-5">
        {quickAction.map(({ description, icon: Icon, id, link, title }) => (
          <Card
            key={id}
            className="w-full max-w-lg flex items-center justify-center">
            <Link href={link} className="w-fit">
              <Icon size={30} category="home" />
            </Link>
            <div>
              <h1 className="text-lg text-textColor text-center font-semibold">
                {title}
              </h1>
              <p className="text-gray-400 text-sm">{description}</p>
            </div>
          </Card>
        ))}
      </div>
      {/* AI SUGGESTION CARD */}
      {/* <Suspense fallback={<AiSuggestionCardSkeleton />}>
        <AiSuggestionCard />
      </Suspense> */}
      {/* AMOUNT CHART */}
      <AmountChart />
      {/* GOAL CARD */}
      <div className="flex md:flex-row flex-col w-full gap-5 items-start">
        <div className="md:max-w-[75%] w-full">
          <GoalCard />
        </div>
        <div className="md:max-w-[25%] w-full">
          <TopTransactionsCard />
        </div>
      </div>
    </>
  );
};

export default page;
