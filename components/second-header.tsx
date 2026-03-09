import Link from 'next/link'
import React, { ReactNode } from 'react'

type TProps = {
    children: ReactNode,
    currentPage: string
}

const SecondHeader = ({ children, currentPage }: TProps) => {
    return (
        <div className='flex items-center justify-between lg:py-5 py-2'>
            <div className='text-gray-400 space-x-1 text-lg'>
                <Link href={'/dashboard'}>Home</Link>
                <span>/</span>
                <Link href={'/'}>{currentPage}</Link>
            </div>
            <div className='h-full'>
                {children}
            </div>
        </div>
    )
}

export default SecondHeader
