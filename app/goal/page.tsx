"use client";
import SecondHeader from "@/components/second-header";
import { Button } from "@/components/ui/button";
import GoalCards from "./_components/goal-cards";
import { useState } from "react";
import GoalModel from "./_components/goal-model";
import GoalTabs from "./_components/goal-tab";

const page = () => {
  const [addGoalModelOpen, setAddGoalModelOpen] = useState(false);

  return (
    <>
      <SecondHeader currentPage="Goal">
        <Button
          className={
            "font-normal text-lg py-5 px-5 bg-primary text-white hover:bg-primary"
          }
          onClick={() => setAddGoalModelOpen(true)}>
          New Goal
        </Button>
      </SecondHeader>

      <GoalCards />

      <GoalTabs />

      <GoalModel
        formMode={"CREATE"}
        open={addGoalModelOpen}
        setOpen={setAddGoalModelOpen}
      />
    </>
  );
};

export default page;
