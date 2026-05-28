'use client';

import { useDeleteBudgetHook, useFilterBudget } from '../_hooks/budget-hooks';
import { Card, CardContent } from '@/components/ui/card';
import { EllipsisVertical } from 'lucide-react';
import { FileBracesCornerIcon } from "@/lib/icon-center";
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteModel from '@/components/delete-model';
import { useState } from 'react';
import "./index.css";
import ViewBudget from './view-budget';
import { IBudgetFilterResponseType } from '@/constants/budgetTypes';

function BudgetCards() {
    
    const { mutate } = useDeleteBudgetHook();

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [deleteModelOpen, setDeleteModelOpen] = useState(false)
    const [viewModelOpen, setViewModelOpen] = useState(false);
    const [selectedBudget, setSelectedBudget]=useState<IBudgetFilterResponseType | null>(null);

    const { data }  = useFilterBudget(
        {
            period:"MONTHLY",
            status:"ALL",
            limit: 10,
            page:1
        }
    );

    const handleDelete = (id:string) => {
        setSelectedId(id)
        setDeleteModelOpen(true)
    }

    const handleConfirmDelete = () => {
        if(selectedId){
            mutate(selectedId)
        }
        setSelectedId(null);
        setDeleteModelOpen(false);
    };

    const handleViewModel = (budget:IBudgetFilterResponseType) => {
        setViewModelOpen(true);
        setSelectedBudget(budget);
    };

  return (
    <div className='grid md:grid-cols-2 grid-cols-1 w-full gap-5'>
        {
            data && data?.data?.budgets?.map((item) =>(
                <Card className="w-full" key={item?.id}>
                    <CardContent>
                        {/* HEADER */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <div className="w-fit">
                                    <FileBracesCornerIcon category="shopping" size={30} />
                                </div>
                                <div className="space-y-1">
                                    <h1 className="text-xl font-semibold capitalize">{item?.category}</h1>
                                    <p className="text-xs text-textColor capitalize">{item?.period} Budget</p>
                                </div>
                            </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <button type='button'>
                                            <EllipsisVertical className="cursor-pointer dark:text-gray-500 dark:hover:text-white hover:text-gray-800" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={()=>handleViewModel(item)}>View</DropdownMenuItem>
                                        <DropdownMenuItem onClick={()=>handleDelete(item?.id!)}>Delete</DropdownMenuItem>
                                        <DropdownMenuItem>Update</DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                        </div>
                        <div className='my-5'/>
                        {/* BODY SECTION */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <p className="dark:text-gray-400 text-gray-700">Spent</p>
                                <h1 className="font-normal">₹{item?.spent} / ₹{item?.amount.toString()}</h1>
                            </div>
                            <Progress
                                value={item?.usedPercentage}
                                id="progress-upload"
                                className=''
                            />
                            <div className="flex items-center justify-between">
                                <p className="text-green-700 font-semibold text-sm">Used {item?.usedPercentage}%</p>
                                <h1 className="font-normal dark:text-gray-400 text-gray-700">Remaining ₹{item?.remaining}</h1>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))
        }
        { selectedId &&
            <DeleteModel
                name='Budget'
                open={deleteModelOpen}
                setOpen={setDeleteModelOpen}
                handleDelete={handleConfirmDelete}
            />
        }
        {
        selectedBudget &&
        
        <ViewBudget
        open={viewModelOpen}
        setOpen={setViewModelOpen}
        budget={selectedBudget}
        />
    }
    </div>
  )
}

export default BudgetCards;
