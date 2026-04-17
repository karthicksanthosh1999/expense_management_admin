import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { IGoalModelTypes } from '../_types/goalTypes';
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/hooks/authHooks";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@/components/date-picker";
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateGoalHook } from '../_hooks/goal-hook';
import { goalValidationSchema, TGoalValidationSchema } from '@/validation_schema/goal-validation';
import { Separator } from '@/components/ui/separator';

const GoalModel = ({ formMode, open, setOpen }: IGoalModelTypes) => {

    const { user } = useAuth();
    const { mutate } = useCreateGoalHook()

    const {
        formState: { errors },
        reset,
        handleSubmit,
        register,
        control,
    } = useForm({
        resolver: zodResolver(goalValidationSchema),
        defaultValues: {
            userId: user?.id
        },
    });


    useEffect(() => {
        if (user?.id) {
            reset({
                userId: user.id,
            });
        }
    }, [user, reset]);


    const handleGoal = (data: TGoalValidationSchema) => {
        mutate(data);
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };


    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className={'bg-card max-w-2xl'}>
                <form onSubmit={handleSubmit(handleGoal)}>
                    <DialogHeader>
                        <DialogTitle className={"text-2xl"}>
                            Goal
                        </DialogTitle>
                    </DialogHeader>
                    <Separator className='' />
                    <FieldGroup className="my-3">
                        <Field>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                {...register("title")}
                                placeholder="Enter Your Description"
                                className="h-10 text-xl font-normal"
                            />
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
                        </Field>
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
                            Add Goal
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default GoalModel
