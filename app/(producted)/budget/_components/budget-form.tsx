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
  budgetValidationSchema,
  TBudgetValidationSchema
} from "@/validation_schema/budget-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CategoryHorizontalPicker from "@/components/category-pickert";
import { Calendar } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Period } from "@prisma/client";
import { IBudgetType } from "@/constants/budgetTypes";
import { useCreateBudgetHook } from "../_hooks/budget-hooks";
import { Separator } from "@/components/ui/separator";


interface TProps extends IModelPropsType {
  mode: "CREATE" | "UPDATE";
  existingBudgetData?: TBudgetValidationSchema;
}

export default function BudgetForm({
  open,
  setOpen,
  mode,
  existingBudgetData,
}: TProps){

    const { user } = useAuth();
    const { mutate, isPending } = useCreateBudgetHook()

    const {handleSubmit, formState: {errors}, register, control, reset, watch, setValue} = useForm(
        {
            resolver: zodResolver(budgetValidationSchema),
            defaultValues:{
                period: "WEEKLY",
                alert: 50,
            }
        }
    );

    useEffect(() => {
    if (user?.id) {
      reset((preV) => ({
        ...preV,
        userId: user.id
      }));
    }
  }, [user, reset]);

    const handleBudget = (data:IBudgetType) => {
        mutate(data);
        setOpen(false)
        reset()
    }

    const handleClose = () => {
        setOpen(false)
        reset()
    }

    const periodOptions = [
        { label: "Weekly", value: "WEEKLY", icon : <Calendar size={30} /> },
        { label: "Monthly", value: "MONTHLY", icon : <Calendar size={30} /> },
        { label: "Yearly", value: "YEARLY", icon : <Calendar size={30} /> },
    ];

    const selectedPeriod = watch("period");

    return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-card border border-highlight h-auto">
        <form onSubmit={handleSubmit(handleBudget)}>
          <DialogHeader>
            <DialogTitle className={"text-xl capitalize"}>
              {mode === "CREATE" ? "Create" : "Update"} Budget
            </DialogTitle>
          </DialogHeader>

      <Separator className='my-2'/>

        <FieldGroup className="my-3">
        {/* CATEGORY */}
            <Field>
              <Label htmlFor="category">Category</Label>
              <CategoryHorizontalPicker control={control} />
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
            </Field>

        {/* PERIOD */}
            <Field>
            <Label htmlFor="amount">Period</Label>
            <div className="flex items-center justify-around gap-3">
                {periodOptions.map((item) => (
                <button
                    key={item.value}
                    type="button"
                    onClick={() => setValue("period", item.value as Period)}
                    className={`
                    flex flex-col items-center gap-2
                    px-5 py-3 rounded-xl border transition-all duration-200
                    w-full
                    ${
                        selectedPeriod === item.value
                        ? "border-blue-600 text-blue-600"
                        : "border-gray-300 text-gray-400"
                    }
                    `}
                >
                    {item.icon}
                    <span>{item.label}</span>
                </button>
                ))}
            </div>
            </Field>                                                                                    
        
        {/* ALERT */}
            <Field>
            <Label htmlFor="alert">Alert</Label>
            <Controller
                control={control}
                name="alert"
                render={({ field }) => (
                <div className="space-y-2">
                <Slider
                    defaultValue={[(field.value) || 50]}
                    max={100}
                    step={1}
                    value={[(field.value) || 50]}
                    onValueChange={(val) => field.onChange(val)}
                    className="w-full cursor-pointer"
                    />

                    <p className="text-sm text-muted-foreground">
                    Alert at {(field.value) || 50}%
                    </p>
                </div>
                )}
            />
            </Field>

        {/* NOTES */}
            <Field>
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="description"
                {...register("notes")}
                placeholder="Enter Your Notes"
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
              {mode === "CREATE" ? "Add" : "Update"} Budget
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    )
}