import React, { useEffect } from 'react'
import { useFilterBudget } from '../_hooks/budget-hooks';
import { Card, CardContent } from '@/components/ui/card';
import { EllipsisVertical, Menu, ShoppingBag } from 'lucide-react';
import { FileBracesCornerIcon } from "@/lib/icon-center";
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import "./index.css"

function BudgetCards() {
    const { data }  = useFilterBudget(
        {
            period:"MONTHLY",
            status:"ALL",
            limit: 10,
            page:1
        }
    );

    console.log(data)

  return (
    <div>
      <Card className="max-w-[50%]">
        <CardContent>
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="w-fit">
                        <FileBracesCornerIcon category="shopping" size={30} />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-xl font-semibold">Shopping</h1>
                        <p className="text-xs text-textColor">Weekly Budget</p>
                    </div>
                </div>
              <EllipsisVertical className="cursor-pointer dark:text-gray-500" />
            </div>
            <div className='my-5'/>
            {/* BODY SECTION */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <p className="dark:text-gray-400 text-gray-700">Spent</p>
                    <h1 className="font-normal">$523 / $800</h1>
                </div>
                <Progress
                  value={50}
                  id="progress-upload"
                  className="w-full progress-fill"
                />
                <div className="flex items-center justify-between">
                    <p className="text-green-700 font-semibold text-sm">Used 32%</p>
                    <h1 className="font-normal dark:text-gray-400 text-gray-700">Remaining $277</h1>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BudgetCards;
