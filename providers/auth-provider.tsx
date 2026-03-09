import React, { ReactNode } from 'react'
import { ThemeProvider } from './theme-providers'
import GlobalHeader from '@/components/global-header'

type TProps = {
    children: ReactNode
}

const AuthProvider = ({ children }: TProps) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <GlobalHeader>
                {children}
            </GlobalHeader>
        </ThemeProvider>
    )
}

export default AuthProvider
