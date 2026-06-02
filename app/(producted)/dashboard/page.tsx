import GoalCard from "./_components/goal-card";
import TopTransactionsCard from "../transactions/_components/top-transactions";
import AiSuggestionCard from "./_components/ai_suggestion";
import { Suspense } from "react";
import AiSuggestionCardSkeleton from "@/components/loders/AiCardSkalitonLoader";
import AmountCard from "./_components/amount-card";
import { WeeklyBarChart } from "./_components/weekly-bar-chart";
import { AmountChart } from "./_components/amount-chart";

const page = async () => {
  return (
    <>
      {/* AMOUNT CARD  */}
      <AmountCard />
      
      {/* AI SUGGESTION CARD */}
      <div className="w-full h-fit">
        <Suspense  fallback={<AiSuggestionCardSkeleton />}>
          <AiSuggestionCard />
        </Suspense>
      </div>

      <div className="grid sm:grid-cols-2 grid-cols-1 w-full h-full gap-5">
        <div className="w-full h-full">
        <AmountChart />
        </div>
        {/* BAR CHART SECTION */}
        <div className="w-full h-full">
          <WeeklyBarChart />
        </div>
      </div>
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
