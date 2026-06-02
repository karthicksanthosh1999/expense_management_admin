import Link from 'next/link'
import React, { ReactNode } from 'react'

type TProps = {
    children: ReactNode,
    currentPage: string
}

const SecondHeader = ({ children, currentPage }: TProps) => {
    return (
        <div className='flex sm:flex-row flex-col items-center justify-between lg:py-5 py-2'>
            <div className='text-gray-400 space-x-1 text-sm font-normal'>
                <Link href={'/dashboard'}>Home</Link>
                <span>/</span>
                <Link href={'/'}>{currentPage}</Link>
            </div>
            <div className='h-full sm:mt-0 mt-5'>
                {children}
            </div>
        </div>
    )
}

export default SecondHeader
