"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IModelPropsType } from "@/constants/CommonTypes";
import { useAuth } from "@/context/hooks/authHooks";
import { TTransactionType } from "@/lib/constants";
import { transactionValidationSchema } from "@/validation_schema/transaction-validatino";
import { zodResolver } from "@hookform/resolvers/zod";
import { use } from "react";
import { useForm } from "react-hook-form";

interface TProps extends IModelPropsType {
  formType: TTransactionType;
}

export function TransactionForm({ open, setOpen, formType }: TProps) {
  const { user } = useAuth();

  const {
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(transactionValidationSchema),
    defaultValues: {
      userId: user?.data?.id,
    },
  });


  const handleTransaction = () => {
    console.log("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleTransaction(handleSubmit)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{formType} Transaction</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" name="amount" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
