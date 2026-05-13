"use client";
import SecondHeader from "@/components/second-header";
import { Button } from "@/components/ui/button";
import GoalCards from "./_components/goal-cards";
import { useState } from "react";
import GoalModel from "./_components/goal-model";
import GoalList from "./_components/goal-list";

const page = () => {
  const [addGoalModelOpen, setAddGoalModelOpen] = useState(false);

  return (
    <>
      <SecondHeader currentPage="Goal">
        <Button
          className={
            "font-semibold text-sm py-5 px-5 bg-primary text-white hover:bg-primary"
          }
          onClick={() => setAddGoalModelOpen(true)}>
          New Goal
        </Button>
      </SecondHeader>

      <GoalCards />

      <GoalList />

      <GoalModel
        mode="CREATE"
        open={addGoalModelOpen}
        setOpen={setAddGoalModelOpen}
      />
    </>
  );
};

export default page;
