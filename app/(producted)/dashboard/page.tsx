import GoalCard from "./_components/goal-card";
import TopTransactionsCard from "../transactions/_components/top-transactions";
import AiSuggestionCard from "./_components/ai_suggestion";
import { Suspense } from "react";
import AiSuggestionCardSkeleton from "@/components/loders/AiCardSkalitonLoader";
import { BotMessageSquare, ComputerIcon, Goal } from "lucide-react";
import aiIcon from "@/sources/icons/ai.png";
import AmountCard from "./_components/amount-card";
import { AmountChart } from "./_components/amount-chart";

const page = async () => {
  return (
    <>
      {/* AMOUNT CARD  */}
      <AmountCard />

      {/* AI SUGGESTION CARD */}
      <Suspense fallback={<AiSuggestionCardSkeleton />}>
        <AiSuggestionCard />
      </Suspense>

      {/* AMOUNT CHART */}
      {/* <AmountChart /> */}

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
