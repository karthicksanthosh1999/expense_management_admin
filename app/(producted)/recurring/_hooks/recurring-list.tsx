'use client';

import PageLoader from '@/components/loaders/ButtonLoading';
import { useFilterRecurringTransaction } from './recurring-hook'
import { Card, CardContent } from '@/components/ui/card';
import { CategoryIcon } from '@/lib/icon-center';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Dot, EllipsisVertical } from 'lucide-react';
import { dateFormat } from '@/lib/dateformator';

export default function RecurringTransactionList() {
  
    const { data, isLoading } = useFilterRecurringTransaction()
    return (
    <>
    {
    isLoading ? (
      <div className="flex items-center justify-center min-h-full">
        <PageLoader/>
      </div>
        ) :  ( 
          data && data?.data?.length === 0 ? 
            <>No Transaction Found</>
            : 
            ( data?.data && data?.data?.map((item) => (
            <Card key={item?.id} className='w-full h-fit max-w-lg border border-highlight'>
              <CardContent>
                <div className="flex items-center w-full gap-5">
                <div className="w-fit">
                  <CategoryIcon category={item?.category} size={30}  />
                </div>
                  <div className="flex items-center justify-between w-full">
                    <h1 className='text-lg font-semibold'>{item?.message}</h1>
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="outline" size={'icon'} ><EllipsisVertical /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={'bg-card border border-highlight'}>
                          <DropdownMenuItem>
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>                                                   
                    </div>
                  </div>
                  </div>
                  <div className='flex items-center justify-between my-3'>
                    <h1 className='text-2xl font-semibold'>₹{item?.amount.toString() ?? 0}</h1>
                    {
                      item?.frequency === "DAILY" && 
                    <p className='text-sm  border border-green-400 text-green-400 rounded-lg p-2'>{item?.frequency ?? "N/A"}</p>
                    }
                    {
                      item?.frequency === "MONTHLY" && 
                    <p className='text-sm  border border-orange-400 text-orange-400 rounded-lg p-2'>{item?.frequency ?? "N/A"}</p>
                    }
                  </div>
                  <div className='flex items-center justify-between space-y-3'>
                    <h4 className='text-sm font-semibold'>Due Date:</h4>
                    <p>{dateFormat(item?.startDate)}</p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <h4 className='text-sm font-semibold'>Next Date:</h4>
                    <p>{dateFormat(item?.nextRunDate)}</p>
                  </div>
              </CardContent>
            </Card>
        )) ))
    }
    </>
  )
}
