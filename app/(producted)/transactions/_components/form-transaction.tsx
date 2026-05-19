"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IModelPropsType } from "@/constants/CommonTypes";
import { useAuth } from "@/context/hooks/authHooks";
import { TTransactionType } from "@/lib/constants";
import {
  transactionValidationSchema,
  TTransactionValidationSchemaType,
} from "@/validation_schema/transaction-validatino";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateTransactionHook,
  useUpdateTransactionHook,
} from "../_hooks/transaction-hook";
import { formatDateForInput } from "@/lib/dateFormat ";
import CategoryHorizontalPicker from "@/components/category-pickert";

interface TProps extends IModelPropsType {
  formType: TTransactionType;
  mode: "CREATE" | "UPDATE";
  existingTransactionData?: TTransactionValidationSchemaType;
}

export function TransactionForm({
  open,
  setOpen,
  formType,
  mode,
  existingTransactionData,
}: TProps) {
  const { user } = useAuth();
  const { mutate } = useCreateTransactionHook();
  const { mutate: updateTransactionMutation } = useUpdateTransactionHook();

  const {
    formState: { errors },
    reset,
    handleSubmit,
    register,
    control,
  } = useForm({
    resolver: zodResolver(transactionValidationSchema),
    defaultValues: {
      userId: user?.id,
      transactionType: formType,
    },
  });

  useEffect(() => {
    if (existingTransactionData) {
      reset({
        amount: existingTransactionData?.amount,
        category: existingTransactionData?.category,
        message: existingTransactionData?.message,
        transactionDate: formatDateForInput(
          existingTransactionData?.transactionDate,
        ),
        transactionType: existingTransactionData?.transactionType,
        id: existingTransactionData.id,
        userId: user?.id,
      });
    }
  }, [existingTransactionData, reset, user]);

  useEffect(() => {
    if (user?.id) {
      reset((preV) => ({
        ...preV,
        userId: user.id,
        transactionType: formType,
      }));
    }
  }, [user, formType, reset]);

  const handleTransaction = (data: TTransactionValidationSchemaType) => {
    if (mode === "CREATE") {
      mutate(data);
    } else {
      updateTransactionMutation(data);
    }
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-card border border-highlight h-auto">
        <form onSubmit={handleSubmit(handleTransaction)}>
          <DialogHeader>
            <DialogTitle className={"text-2xl capitalize"}>
              {formType.toString().toLowerCase()} Transaction
            </DialogTitle>
          </DialogHeader>
          <FieldGroup className="my-3">
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
            </Field>
            <Field>
              <Label htmlFor="username-1">Description</Label>
              <Input
                id="description"
                {...register("message")}
                placeholder="Enter Your Description"
                className="h-10 text-xl font-normal"
              />
            </Field>
            <Field>
              <Label htmlFor="category">Category</Label>
              <CategoryHorizontalPicker control={control} />
            </Field>
            <Field>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                {...register("transactionDate")}
                placeholder="Enter Your Description"
                className="h-10 text-xl font-normal"
              />
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
              {mode === "CREATE" ? "Add" : "Update"} Transaction
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
