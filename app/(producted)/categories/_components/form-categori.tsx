"use client";

import { IFormTypes, IModelPropsType } from '@/constants/CommonTypes'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/hooks/authHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { categoryValidationSchema } from '@/validation_schema/category-calidation';
import { createCategoryMutationHook, useUpdateCategoryHook } from '../_hooks/categoriesHooks';
import { ICategoryTypes } from '@/constants/categoryTypes';
import { useEffect } from 'react';

interface IProps extends IModelPropsType {
    formMode?: IFormTypes,
    category?: ICategoryTypes
}

const CategoryForm = ({ open, setOpen, category, formMode }: IProps) => {


    const { user } = useAuth();

    const { mutate: createCategoryMutation, isPending: createCategoryIsLoading } = createCategoryMutationHook()
    const { mutate: updateCategoryMutation, isPending: updateCategoryIsLoading } = useUpdateCategoryHook()

    const {
        formState: { errors },
        control,
        reset,
        handleSubmit,
    } = useForm({
        resolver: zodResolver(categoryValidationSchema)
    });


    useEffect(() => {
        if (formMode === "Update" && category) {
            reset({
                ...category,
                userId: user?.data?.id,
            });
        } else if (user?.data?.id) {
            reset({
                userId: user.data.id,
            });
        }
    }, [category, formMode, user, reset]);

    const handleTransaction = (data: ICategoryTypes) => {
        if (formMode === "Update" && category?.id) {
            updateCategoryMutation(
                { id: category.id, ...data },
                {
                    onSuccess: handleClose,
                }
            );
        } else {
            createCategoryMutation(data, {
                onSuccess: handleClose,
            });
        }
    };

    const handleClose = () => {
        setOpen(false)
        reset()
    }



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-card border border-highlight">
                <form onSubmit={handleSubmit(handleTransaction)}>
                    <DialogHeader>
                        <DialogTitle className={'text-2xl'}>{formMode} Category</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="title">Title</FieldLabel>
                                    <Input
                                        {...field}
                                        id="title"
                                        placeholder="Enter Your Title"
                                        className="h-12 text-xl font-normal"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="color"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="color">Color</FieldLabel>
                                    <Input
                                        {...field}
                                        id="color"
                                        type='color'
                                        className="h-12 text-xl font-normal"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <div className="flex items-center justify-center gap-5">
                        <Button variant="outline" type="button" className={'text-textColor text-base font-normal p-5'} onClick={handleClose} >Cancel</Button>
                        {
                            formMode === "Create" ? (
                                <Button variant="default" type="submit" className={'text-textColor text-base font-normal p-5'}> {createCategoryIsLoading ? "Processing..." : "Add Category"}</Button>
                            ) : (

                                <Button variant="default" type="submit" className={'text-textColor text-base font-normal p-5'}> {updateCategoryIsLoading ? "Processing..." : "Update Category"}</Button>
                            )
                        }
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    )
}

export default CategoryForm
