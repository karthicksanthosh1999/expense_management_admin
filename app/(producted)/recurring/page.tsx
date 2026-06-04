'use client';

import SecondHeader from '@/components/second-header'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import RecurringForm from './_components/recurring-form';
import RecurringTransactionList from './_hooks/recurring-list';

export default function page() {

    const [transactionModelOpne, setTransactionModelOpen] = useState(false);

  return (
    <>
        <SecondHeader currentPage='Recurring Transaction'>
            <Button
            className={
                "font-semibold text-sm py-5 px-5 bg-primary text-white hover:bg-primary"
            }
            onClick={() => setTransactionModelOpen(true)}>
            New Goal
            </Button>
        </SecondHeader>

        <RecurringTransactionList />

        <RecurringForm
            mode='CREATE'
            open={transactionModelOpne}
            setOpen={setTransactionModelOpen}
        />  
    </>
  )
}
