'use client';
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/hooks/authHooks";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { TUserValidationSchema, userValidationSchema } from '@/validation_schema/user-validation';

const ProfileCard = () => {
    const [editMode, setEditMode] = useState(true);
    const { user } = useAuth();

    const { handleSubmit, register, reset } = useForm<TUserValidationSchema>({
        resolver: zodResolver(userValidationSchema),
    });

    useEffect(() => {
        if (user?.data) {
            reset({
                email: user.data.email,
                fullName: user.data.fullname,
                mobile: user.data.mobile,
            });
        }
    }, [user, reset]);


    const handleLogin = async (data: TUserValidationSchema) => {
        try {
            const response = await api.put(`/api/users/update/${user?.data?.id}`, data);
            console.log(response)
            reset();
            setEditMode(false)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card>
            <CardContent>
                <CardTitle className='text-2xl'>Profile Information</CardTitle>
                <form className="p-6 md:p-8" onSubmit={handleSubmit(handleLogin)}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Full Name:</FieldLabel>
                            <Input
                                disabled={editMode}
                                type='string'
                                placeholder='Jhon Duo'
                                {...register('fullName')}
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Email</FieldLabel>
                            <Input
                                disabled={editMode}
                                type="email"
                                placeholder="m@example.com"
                                {...register("email")}
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Phone No:</FieldLabel>
                            <Input
                                disabled={editMode}
                                type="text" {...register("mobile")} />
                        </Field>
                        <Field>
                            {
                                editMode ?
                                    <Button type="button" onClick={() => setEditMode(false)} className="w-full text-lg font-normal text-textColor p-4">
                                        Edit
                                    </Button>
                                    :
                                    (
                                        <div className='flex items-center w-full justify-center'>
                                            <Button type="submit" className="w-full text-lg font-normal text-textColor p-4">
                                                Update
                                            </Button>
                                            <Button type="button" variant={'outline'} className="w-full text-lg font-normal text-textColor p-4 hover:border-highlight">
                                                Cancel
                                            </Button>
                                        </div>
                                    )
                            }
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}

export default ProfileCard
