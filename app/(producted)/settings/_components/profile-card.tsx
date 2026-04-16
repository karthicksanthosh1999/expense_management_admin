"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/hooks/authHooks";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TUserValidationSchema,
  userValidationSchema,
} from "@/validation_schema/user-validation";

const ProfileCard = () => {
  const [editMode, setEditMode] = useState(true);
  const { user } = useAuth();

  const { handleSubmit, register, reset } = useForm<TUserValidationSchema>({
    resolver: zodResolver(userValidationSchema),
    defaultValues: {
      email: user?.email,
      name: user?.name,
      mobile: user?.mobile,
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        name: user.name,
        mobile: user.mobile,
      });
    }
  }, [user, reset]);

  const handleRegister = async (data: TUserValidationSchema) => {
    try {
      const response = await api.put(
        `/api/users/update/${user?.id}`,
        data,
      );
      reset();
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditMode(true)

  }

  return (
    <Card>
      <CardContent>
        <CardTitle className="text-2xl">Profile Information</CardTitle>
        <form className="p-6 md:p-8" onSubmit={handleSubmit(handleRegister)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Full Name:</FieldLabel>
              <Input
                disabled={editMode}
                type="string"
                placeholder="Jhon Duo"
                {...register("name")}
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
              <Input disabled={editMode} type="text" placeholder="Mobile Number" {...register("mobile")} />
            </Field>
            <Field>
              {editMode ? (
                <Button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="w-full text-lg font-normal text-textColor p-4">
                  Edit
                </Button>
              ) : (
                <div className="flex flex-col space-y-3 items-center w-full justify-center">
                  <Button
                    type="submit"
                    className="w-full text-lg font-normal text-textColor p-4">
                    Update
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={handleCancel}
                    className="w-full text-lg font-normal text-textColor p-4 hover:border-highlight">
                    Cancel
                  </Button>
                </div>
              )}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
