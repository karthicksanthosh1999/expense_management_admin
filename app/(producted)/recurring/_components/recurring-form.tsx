'use client';

import CategoryHorizontalPicker from '@/components/category-pickert';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { IModelPropsType } from '@/constants/CommonTypes';
import { useAuth } from '@/context/hooks/authHooks';
import { formatDateForInput } from '@/lib/dateFormat ';
import { recurringTransactionValidationSchema, TRecurringTransactionValidationSchemaType } from '@/validation_schema/transaction-validatino';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface TProps extends IModelPropsType {
  mode: "CREATE" | "UPDATE";
  existingTransactionData?: TRecurringTransactionValidationSchemaType;
}

export default function RecurringForm({ mode, open, setOpen, existingTransactionData } : TProps) {
    const { user } = useAuth();
    const { 
        reset, 
        register, 
        control, 
        handleSubmit, 
        formState: { errors} 
    } = useForm({
        resolver: zodResolver(recurringTransactionValidationSchema),
        defaultValues: {
              userId: user?.id,
        }
    });

      useEffect(() => {
        if (existingTransactionData) {
          reset({
            amount: existingTransactionData?.amount,
            category: existingTransactionData?.category,
            message: existingTransactionData?.message,
            startDate: formatDateForInput(
              existingTransactionData?.startDate,
            ),
            nextRunDate: formatDateForInput(
              existingTransactionData?.nextRunDate,
            ),
            frequency: existingTransactionData?.frequency,
            id: existingTransactionData.id,
            userId: user?.id,
          });
        }
      }, [existingTransactionData, reset, user]);

      useEffect(()=>{
        if(user?.id){
            reset((pre) =>({
                ...pre,
                userId: user.id
            }))
        }
      },[user, reset])


        const handleTransaction = (data: TRecurringTransactionValidationSchemaType) => {
          if (mode === "CREATE") {
            console.log(data)
          } else {
            // updateTransactionMutation(data);
          }
          handleClose();
        };
        const handleClose = () => {
          setOpen(false);
          reset();
        };

        console.log(errors)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
        <form onSubmit={handleSubmit(handleTransaction)}> 
            <DialogHeader>
                <DialogTitle>{mode ?? "N/A"} Transaction</DialogTitle>
            </DialogHeader>
          <Separator className='my-5' />
            <FieldGroup className="my-3">
              <Field>
                <Label htmlFor="amount">Amount:</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  {...register("amount")}
                  placeholder="00.00"
                  className="h-10 text-xl font-normal"
                />
              </Field>
                {errors?.amount?.message && (
                      <p className="text-sm text-red-500">{errors?.amount?.message}</p>
                    )}
              <Field>
                <Label htmlFor="username-1">Description:</Label>
                <Input
                  id="description"
                  {...register("message")}
                  placeholder="Enter Your Description"
                  className="h-10 text-xl font-normal"
                />
              </Field>
                  {errors?.message?.message && (
                      <p className="text-sm text-red-500">{errors?.message?.message}</p>
                    )}
              <Field>
                <Label htmlFor="category">Category</Label>
                <CategoryHorizontalPicker control={control}  />
              </Field>
                    {errors?.category?.message && (
                      <p className="text-sm text-red-500">{errors?.category?.message}</p>
                    )}
              <Field>
                <Label htmlFor="date">Start Date:</Label>
                <Input
                  id="date"
                  type="date"
                  {...register("startDate")}
                  placeholder="Select the Start date"
                  className="h-10 text-xl font-normal"
                />
              </Field>
                  {errors?.startDate?.message && (
                      <p className="text-sm text-red-500">{errors?.startDate?.message}</p>
                    )}
              <Field>
              
              <Controller
                control={control}
                name="frequency"
                render={({ field }) => (
                    <Field>
                    <Label>Frequency</Label>

                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="DAILY">Daily</SelectItem>
                        <SelectItem value="WEEKLY">Weekly</SelectItem>
                        <SelectItem value="MONTHLY">Monthly</SelectItem>
                        <SelectItem value="YEARLY">Yearly</SelectItem>
                        </SelectContent>
                    </Select>
                    </Field>
                )}
              /> 
              </Field>
              <Label htmlFor="date">Start Date:</Label>
                <Input
                  id="date"
                  type="date"
                  {...register("nextRunDate")}
                  placeholder="Select the next date"
                  className="h-10 text-xl font-normal"
                />
                  {errors?.nextRunDate?.message && (
                      <p className="text-sm text-red-500">{errors?.nextRunDate?.message}</p>
                    )}
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
  )
}
