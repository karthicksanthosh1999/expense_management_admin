'use client';
import React, { ReactNode } from "react";
import { ThemeProvider } from "./theme-providers";
import GlobalHeader from "@/components/global-header";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@/context/hooks/authHooks";
import { LoginForm } from "@/components/login";

type TProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: TProps) => {

  const { user } = useAuth()


  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      {
        user ?
          <GlobalHeader>
            {children}
            <Toaster position="top-right" />
          </GlobalHeader>
          : (
            <div className="flex h-screen w-full max-w-5xl items-center justify-center">
              <LoginForm />
            </div>
          )
      }
    </ThemeProvider>
  );
};

export default AuthProvider;
