"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { userValidationSchema } from "@/validation_schema/user-validation";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ButtonLoading from "./loders/ButtonLoading";
import { useState } from "react";
import AuthCarasole from "./auth-carasole";

type registerFormData = z.infer<typeof userValidationSchema>;

export function RegisterPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, register, reset } = useForm<registerFormData>({
    resolver: zodResolver(userValidationSchema),
  });

  const handleRegister = async (registerPayload: registerFormData) => {
    try {
      setIsLoading(true);
      const { data } = await api.post("/api/auth/register", registerPayload);
      if (data?.user) {
        navigate.push("/");
      }
      setIsLoading(false);
      reset();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full h-auto max-w-5xl container mx-auto md:mx-5",
        className,
      )}
      {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2 grid-cols-1 justify-center">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(handleRegister)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome to the SK-Tech</h1>
                <p className="text-balance text-muted-foreground">
                  User Register
                </p>
              </div>

              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Input
                  type="text"
                  placeholder="Joseph Karthick"
                  {...register("name")}
                />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="jk@jk.net"
                  {...register("email")}
                />
              </Field>
              <Field>
                <FieldLabel>Mobile</FieldLabel>
                <Input
                  type="text"
                  placeholder="8220945623"
                  {...register("mobile")}
                />
              </Field>
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="*********"
                  {...register("password")}
                />
              </Field>
              <Field>
                <Field>
                  <Button
                    type="submit"
                    className="w-full text-textColor text-base font-normal p-5">
                    {isLoading ? (
                      <>
                        <ButtonLoading />
                      </>
                    ) : (
                      <h1>Register</h1>
                    )}
                  </Button>
                </Field>
              </Field>

              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link href="/">Login</Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="relative hidden bg-muted md:block h-full">
            <AuthCarasole />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
