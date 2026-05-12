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
    if (user?.id) {
      reset({
        userId: user.id,
        goalId,
      });
    }
  }, [user, reset]);

  const handleGoal = (data: TGoalAmountValidationSchema) => {
    mutate(data);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit(handleGoal)}>
        <DialogContent className="sm:max-w-sm bg-card">
          <DialogHeader>
            <DialogTitle>Add Amount</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="text"
                {...register("amount")}
                placeholder="0.00"
                className="h-10 text-xl font-normal"
              />
              <FieldContent>
                {errors?.amount?.message && errors?.amount.message}
              </FieldContent>
            </Field>
          </FieldGroup>
          <div className="flex items-center justify-center gap-5">
            <Button
              variant="outline"
              type="button"
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
        </DialogContent>
      </form>
    </Dialog>
  );
}
