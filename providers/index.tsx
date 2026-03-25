// providers/index.tsx
'use client';

import { AuthUserProvider } from "@/context/AuthContext";
import AuthProvider from "@/providers/auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient()
    return (
        <AuthUserProvider>
            <AuthProvider>
                <QueryClientProvider client={queryClient} >
                    {children}
                </QueryClientProvider>
            </AuthProvider>
        </AuthUserProvider>
    );
}
