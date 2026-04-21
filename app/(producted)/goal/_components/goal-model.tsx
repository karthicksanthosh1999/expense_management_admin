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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateGoalHook, useUpdateGoalHook } from "../_hooks/goal-hook";
import {
  goalValidationSchema,
  TGoalValidationSchema,
} from "@/validation_schema/goal-validation";
import { Separator } from "@/components/ui/separator";
import { IGoalType } from "@/constants/goalTypes";

interface TProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode: "CREATE" | "UPDATE";
  existingGoalData?: IGoalType;
}

const GoalModel = ({ open, setOpen, mode, existingGoalData }: TProps) => {
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

  const { user } = useAuth();
  const { mutate } = useCreateGoalHook();
  const { mutate: goalUpdateMutation } = useUpdateGoalHook();

  const {
    formState: { errors },
    reset,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(goalValidationSchema),
    defaultValues: {
      userId: user?.id,
    },
  });

  const selectedStatus = watch("goalStatus");

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

  const handleGoal = (data: TGoalValidationSchema) => {
    if (mode === "CREATE") {
      mutate(data);
    } else {
      goalUpdateMutation(data);
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
        <form onSubmit={handleSubmit(handleGoal)}>
          <DialogHeader>
            <DialogTitle className={"text-2xl"}>
              {mode === "UPDATE" ? "Update" : "Create"} Goal
            </DialogTitle>
          </DialogHeader>
          <Separator className="" />
          <FieldGroup className="my-3">
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter Your Title"
                className="h-10 text-xl font-normal"
              />
              <FieldContent>
                {errors?.title?.message && errors?.title.message}
              </FieldContent>
            </Field>
            <Field>
              <Label htmlFor="current_amount">Goal Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                {...register("goalAmount")}
                placeholder="00.00"
                className="h-10 text-xl font-normal"
              />
              <FieldContent>
                {errors?.goalAmount?.message && errors?.goalAmount.message}
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
            <Field>
              <Label htmlFor="current_amount">Current Amount</Label>
              <Input
                id="current_amount"
                type="number"
                step="0.01"
                {...register("currentAmount")}
                placeholder="00.00"
                className="h-10 text-xl font-normal"
              />
              <FieldContent>
                {errors?.currentAmount?.message &&
                  errors?.currentAmount.message}
              </FieldContent>
            </Field>
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
              {mode === "UPDATE" ? "Update" : "Add"} Goal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GoalModel;
