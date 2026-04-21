import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Timeline,
  TimelineBody,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineSeparator,
} from "@/components/ui/timeline";
import { IModelPropsType } from "@/constants/CommonTypes";
import {
  useDeleteGoalAmountHook,
  useGetSingleGoalAmountHook,
  useUpdateGoalHook,
} from "../_hooks/goal-hook";
import { dateFormat } from "@/lib/dateFormat ";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Field, FieldContent } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/hooks/authHooks";
import {
  goalAmountValidationSchema,
  TGoalAmountValidationSchema,
} from "@/validation_schema/goal-validation";

interface IPtops extends IModelPropsType {
  goalId: string;
}

export function GoalAmountTimeline({ goalId, open, setOpen }: IPtops) {
  const { user } = useAuth();

  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  // HOOKS
  const { data } = useGetSingleGoalAmountHook(goalId);
  const { mutate } = useUpdateGoalHook();
  const { mutate: goalHistoryDeleteMutation } = useDeleteGoalAmountHook();

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
    mutate({
      ...data,
      id: selectedId,
    });
    setIsEdit(false);
    setSelectedId("");
  };

  const handleEdit = (id: string, amount: number) => {
    setIsEdit(true);
    setSelectedId(id);
    reset({
      amount,
      userId: user?.id || "",
      goalId,
    });
  };

  const handleClose = () => {
    reset({
      amount: "",
      id: "",
    });
    setSelectedId("");
    setOpen(false);
    setIsEdit(false);
  };

  const handleResetInput = () => {
    reset({ amount: "" });
    setSelectedId("");
    setIsEdit(false);
  };

  const handleDelete = (id: string) => {
    goalHistoryDeleteMutation({ id });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className={"bg-card"}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold">
            Goal History
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Separator />
        <Timeline color="secondary" orientation="vertical">
          {data && data?.data.length === 0 ? (
            <h1 className="text-center text-lg font-normal">No History</h1>
          ) : (
            data?.data.map((item) => (
              <TimelineItem>
                <TimelineHeader>
                  <TimelineSeparator className="bg-blue-500" />
                  <TimelineIcon className="h-3 w-3 bg-blue-500" />
                </TimelineHeader>
                <TimelineBody className="-translate-y-1.5">
                  <div className="flex items-center">
                    <form
                      onSubmit={handleSubmit(handleGoal)}
                      className="flex items-center gap-3">
                      <div>
                        {isEdit && selectedId === item?.id ? (
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
                              {errors?.amount?.message &&
                                errors?.amount.message}
                            </FieldContent>
                          </Field>
                        ) : (
                          <h3 className="text-base leading-none font-semibold">
                            {item?.amount.toString()}
                          </h3>
                        )}
                      </div>
                      <div className="">
                        {isEdit && selectedId === item?.id ? (
                          <div className="space-x-2 pl-2">
                            {/* Submit */}
                            <Button
                              type="submit"
                              variant="outline"
                              className="text-green-500">
                              <Check />
                            </Button>
                            {/* Cancel */}
                            <Button
                              type="button"
                              variant="outline"
                              className="text-red-500"
                              onClick={handleResetInput}>
                              <X />
                            </Button>
                          </div>
                        ) : (
                          <div className="space-x-1 pl-2">
                            <Button
                              type="button"
                              variant={"outline"}
                              className={"text-blue-500"}
                              onClick={() =>
                                handleEdit(
                                  item.id!,
                                  parseInt(item?.amount.toString()),
                                )
                              }>
                              <Pencil />
                            </Button>
                            <Button
                              type="button"
                              variant={"outline"}
                              className={"text-red-500"}
                              onClick={() => handleDelete(item.id!)}>
                              <Trash2 />
                            </Button>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {dateFormat(item?.createdAt!)}
                  </p>
                </TimelineBody>
              </TimelineItem>
            ))
          )}
        </Timeline>
        <Separator />
        <Button
          variant={"outline"}
          className="p-4 text-sm"
          onClick={handleClose}>
          Close
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
}
