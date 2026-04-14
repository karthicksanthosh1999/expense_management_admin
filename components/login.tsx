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
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/hooks/authHooks";
import { useEffect } from "react";

type LoginFormData = z.infer<typeof userLoginValidationSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useRouter();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user?.data) {
      navigate.push("/dashboard");
    }
  }, [user, navigate]);

  const { handleSubmit, register, reset } = useForm<LoginFormData>({
    resolver: zodResolver(userLoginValidationSchema),
  });

  const handleLogin = async (loginPayload: LoginFormData) => {
    try {
      const { data } = await api.post("/api/auth/login", loginPayload);
      console.log(data?.user);
      if (data?.user) {
        setUser(data?.user);
        navigate.push("/dashboard");
      }
      reset();
    } catch (error) {
      console.log(error);
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
                  placeholder="jk@jk.net"
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
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="w-full text-textColor text-base font-normal p-5">
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
