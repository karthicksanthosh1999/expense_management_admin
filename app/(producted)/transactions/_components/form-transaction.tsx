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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IModelPropsType } from "@/constants/CommonTypes";
import { useAuth } from "@/context/hooks/authHooks";
import { TTransactionType } from "@/lib/constants";
import {
  transactionValidationSchema,
  TTransactionValidationSchemaType,
} from "@/validation_schema/transaction-validatino";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useCreateTransactionHook } from "../_hooks/transaction-hook";

interface TProps extends IModelPropsType {
  formType: TTransactionType;
}

export function TransactionForm({ open, setOpen, formType }: TProps) {
  const { user } = useAuth();

  const { mutate } = useCreateTransactionHook();

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
    if (user?.id) {
      reset((prev) => ({
        ...prev,
        userId: user.id,
      }));
    }
  }, [user, reset]);

  const handleTransaction = (data: TTransactionValidationSchemaType) => {
    mutate(data);
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
    reset();
  };
  console.log(errors);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-card border border-highlight h-auto">
        <form onSubmit={handleSubmit(handleTransaction)}>
          <DialogHeader>
            <DialogTitle className={"text-2xl"}>
              {formType} Transaction
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
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
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
              className={"text-textColor text-base font-normal p-5"}
              onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="default"
              type="submit"
              className={"text-textColor text-base font-normal p-5"}>
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
