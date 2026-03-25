'use client';
import React, { ReactNode } from "react";
import { ThemeProvider } from "./theme-providers";
type TProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: TProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};


export default AuthProvider;
