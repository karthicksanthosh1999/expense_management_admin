"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/hooks/authHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateGoalAmountHook } from "../_hooks/goal-hook";
import {
  goalAmountValidationSchema,
  TGoalAmountValidationSchema,
} from "@/validation_schema/goal-validation";
import { Separator } from "@/components/ui/separator";

interface IPtops {
  open: boolean;
  setOpen: (open: boolean) => void;
  goalId: string;
}

export function GoalAmountForm({ open, setOpen, goalId }: IPtops) {
  const { user } = useAuth();
  const { mutate } = useCreateGoalAmountHook();
  const {
    formState: { errors },
    reset,
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(goalAmountValidationSchema),
    defaultValues: {
      userId: user?.id || "",
      goalId: goalId || "",
    },
  });
  useEffect(() => {
    if (user?.id && goalId) {
      reset({
        userId: user.id,
        goalId,
      });
    }
  }, [user, goalId, reset]);

  const handleGoal = (data: TGoalAmountValidationSchema) => {
    mutate(data);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    reset({
      amount: "",
      userId: user?.id,
      goalId,
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm bg-card border border-highlight">
        <DialogHeader>
          <DialogTitle>Add Amount</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleGoal)}>
          <Separator />
          <FieldGroup>
            <Field>
              <Label htmlFor="amount">Amount</Label>
              <input type="hidden" {...register("userId")} />
              <input type="hidden" {...register("goalId")} />
              <Input
                id="amount"
                type="number"
                step="0.01"
                {...register("amount", { valueAsNumber: true })}
                placeholder="0.00"
              />
              <FieldContent>
                {errors?.amount?.message && errors?.amount.message}
              </FieldContent>
            </Field>
          </FieldGroup>
          <div className="flex items-center justify-center gap-5">
            <Button
              variant="outline"
              type="reset"
              className={"text-textColor text-sm font-normal p-5"}
              onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="default"
              type="submit"
              className={"text-textColor text-sm font-normal p-5"}>
              Add Amount
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
