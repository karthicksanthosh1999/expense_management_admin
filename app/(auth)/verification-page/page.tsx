"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/hooks/authHooks";
import {
  TUserRegisterValidationSchemaType,
  userRegisterValidationSchema,
} from "@/validation_schema/user-validation";
import ButtonLoading from "@/components/loaders/ButtonLoading";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateUser } from "./_hooks/verificationHook";

const page = () => {
  const { user, loading } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TUserRegisterValidationSchemaType>({
    resolver: zodResolver(userRegisterValidationSchema),
  });

  const handleLogin = async (
    loginPayload: TUserRegisterValidationSchemaType,
  ) => {
    try {
      const { data } = await updateUser({
        ...user,
        password: loginPayload.password,
      });
      console.log(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="max-w-lg w-full">
        <CardContent>
          <form className="p-6 md:p-8" onSubmit={handleSubmit(handleLogin)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Change Your Password </h1>
                <p className="text-balance text-muted-foreground">
                  Enter you password and confirm password
                </p>
              </div>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                <FieldContent>
                  {errors?.password?.message && errors?.password.message}
                </FieldContent>
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel>Confirm Password</FieldLabel>
                </div>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
                <FieldContent>
                  {errors?.confirmPassword?.message &&
                    errors?.confirmPassword.message}
                </FieldContent>
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="w-full text-textColor text-base font-normal p-5">
                  {isLoading ? (
                    <>
                      <ButtonLoading />
                    </>
                  ) : (
                    <h1>Change</h1>
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
