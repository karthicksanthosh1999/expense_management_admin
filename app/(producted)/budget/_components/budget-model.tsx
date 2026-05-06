"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/hooks/authHooks";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Slider } from "@/components/ui/slider";
import { useCreateBudgetHook, useFilterGoals } from "../_hooks/budget-hook";
import { Separator } from "@/components/ui/separator";
import { IGoalType } from "@/constants/goalTypes";
import {
  budgetValidationSchema,
  TBudgetValidationSchema,
} from "@/validation_schema/budget-validation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryConfig } from "@/lib/icon-center";
import { Calendar } from "lucide-react";

interface TProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode: "CREATE" | "UPDATE";
  existingGoalData?: IGoalType;
}

const BudgetModel = ({ open, setOpen, mode, existingGoalData }: TProps) => {
  const statusList = [
    {
      id: "0",
      title: "Active",
      value: "ACTIVE",
    },
    {
      id: "1",
      title: "In-Active",
      value: "INACTIVE",
    },
    {
      id: "2",
      title: "Completed",
      value: "COMPLETED",
    },
  ];
  const periodList = [
    {
      id: "0",
      title: "Monthly",
      value: "MONTHLY",
      icon: Calendar,
    },
    {
      id: "1",
      title: "Weekly",
      value: "WEEKLY",
      icon: Calendar,
    },
    {
      id: "2",
      title: "Yearly",
      value: "YEARLY",
      icon: Calendar,
    },
  ];

  const { user } = useAuth();
  const { mutate } = useCreateBudgetHook();
  // const { mutate: goalUpdateMutation } = useUpdateGoalHook();

  const {
    formState: { errors },
    reset,
    handleSubmit,
    register,
    setValue,
    watch,
    control,
  } = useForm({
    resolver: zodResolver(budgetValidationSchema),
    defaultValues: {
      userId: user?.id,
    },
  });

  const selectedStatus = watch("status");

  useEffect(() => {
    if (existingGoalData) {
      reset({
        currentAmount: existingGoalData.currentAmount,
        goalAmount: existingGoalData.goalAmount,
        goalStatus: existingGoalData.goalStatus,
        title: existingGoalData.title,
        id: existingGoalData.id,
        userId: user?.id,
      });
    }
  }, [existingGoalData, reset, user]);

  useEffect(() => {
    if (user?.id) {
      reset((prev) => ({
        ...prev,
        userId: user.id,
      }));
    }
  }, [user, reset]);

  const handleBudget = (data: TBudgetValidationSchema) => {
    if (mode === "CREATE") {
      mutate(data);
    } else {
      // goalUpdateMutation(data);
      console.log(data);
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={"bg-card max-w-2xl"}>
        <form onSubmit={handleSubmit(handleBudget)}>
          <DialogHeader>
            <DialogTitle className={"text-2xl"}>
              {mode === "UPDATE" ? "Update" : "Create"} Budget
            </DialogTitle>
          </DialogHeader>
          <Separator className="" />
          <FieldGroup className="my-3">
            {/* CATEGORY */}
            <Field>
              <Label htmlFor="category">Category</Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue
                        className={"capitalize"}
                        placeholder="Select category"
                      />
                    </SelectTrigger>
                    <SelectContent className={"p-1 "}>
                      {Object.keys(categoryConfig).map((item) => (
                        <SelectItem
                          value={item}
                          className={"capitalize cursor-pointer"}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            {/* AMOUNT */}
            <Field>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                {...register("amount")}
                placeholder="00.00"
                className="h-10 text-xl font-normal"
              />
              <FieldContent>
                {errors?.amount?.message && errors?.amount.message}
              </FieldContent>
            </Field>

            {/* PERIOD */}
            <Field>
              <Label>Period</Label>

              <Controller
                name="period"
                control={control}
                defaultValue="MONTHLY"
                render={({ field }) => (
                  <div className="flex gap-2">
                    {periodList.map((item) => (
                      <Button
                        key={item.value}
                        type="button"
                        className={"text-white flex flex-col items-center"}
                        variant={
                          field.value === item.value ? "default" : "outline"
                        }
                        onClick={() => field.onChange(item.value)}>
                        <item.icon className="size-8" />
                        {item.title}
                      </Button>
                    ))}
                  </div>
                )}
              />

              <FieldContent>{errors?.period?.message}</FieldContent>
            </Field>

            {/* ALERT THRESHOLD */}
            <Field>
              <Label htmlFor="alert">Alert Threshold (%)</Label>
              <Controller
                name="alert"
                control={control}
                render={({ field }) => (
                  <Slider
                    className={"cursor-pointer"}
                    max={100}
                    step={1}
                    value={[Number(field.value)]}
                    onValueChange={(val) => field.onChange(val[0])}
                  />
                )}
              />

              <FieldContent>{errors?.alert?.message}</FieldContent>
            </Field>
            <Field>
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                {...register("notes")}
                placeholder="Enter Your Notes"
                className="h-10 text-xl font-normal"
              />
              <FieldContent>
                {errors?.notes?.message && errors?.notes.message}
              </FieldContent>
            </Field>
            {mode === "UPDATE" && (
              <div className="flex flex-wrap gap-3">
                {statusList.map((item) => {
                  const isActive = selectedStatus === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setValue("goalStatus", item.value)}
                      className={`rounded-xl border px-4 py-2 text-sm border-primary font-medium transition cursor-pointer ${
                        isActive ? "bg-primary text-white" : "hover:bg-input/40"
                      }`}>
                      {item.title}
                    </button>
                  );
                })}
              </div>
            )}
          </FieldGroup>
          <div className="flex items-center justify-center gap-5">
            <Button
              variant="outline"
              type="button"
              className={"text-textColor text-base font-normal p-5"}
              onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="default"
              type="submit"
              className={"text-textColor text-base font-normal p-5"}>
              {mode === "UPDATE" ? "Update" : "Add"} Budget
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetModel;
