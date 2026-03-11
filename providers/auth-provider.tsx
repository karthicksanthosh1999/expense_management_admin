import React, { ReactNode } from "react";
import { ThemeProvider } from "./theme-providers";
import GlobalHeader from "@/components/global-header";
import { Toaster } from "react-hot-toast";

type TProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: TProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <GlobalHeader>
        {children}
        <Toaster position="top-right" />
      </GlobalHeader>
    </ThemeProvider>
  );
};

export default AuthProvider;
