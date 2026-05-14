import GlobalHeader from "@/components/global-header";
import AuthProvider from "@/providers/auth-provider";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

type TProps = {
  children: ReactNode;
};

export default function ProtectedLayout({ children }: TProps) {
  return (
    <AuthProvider>
      <GlobalHeader>
        {children}
        <Toaster position="top-center" />
      </GlobalHeader>
    </AuthProvider>
  );
}
