'use client';
import SecondHeader from "@/components/second-header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import BudgetForm from "./_components/budget-form";
import BudgetCards from "./_components/budget-cards";

export default function page() {

    const [openBudgetModel, setOpenBudgetModel] = useState(false)

    return(
    <>
      <SecondHeader currentPage="Budget">
          <Button
            className={"text-sm text-white p-5"}
            onClick={() => setOpenBudgetModel(true)}>
            Add Budget
          </Button>
      </SecondHeader>

      {/* BUDGET FORM MODEL */}
      <BudgetForm
        mode="CREATE"
        open={openBudgetModel}
        setOpen={setOpenBudgetModel}
      />

      <BudgetCards />
    </>
    )
}