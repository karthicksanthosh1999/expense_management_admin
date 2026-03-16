"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { userLoginValidationSchema } from "@/validation_schema/user-validation";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type LoginFormData = z.infer<typeof userLoginValidationSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { handleSubmit, register, reset } = useForm<LoginFormData>({
    resolver: zodResolver(userLoginValidationSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await api.post("/api/auth/login", data);
      console.log(response?.data?.user);

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(handleLogin)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your account
                </p>
              </div>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel>Password</FieldLabel>
                  <a className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input type="password" {...register("password")} />
              </Field>

              <Field>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </Field>
            </FieldGroup>
          </form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
