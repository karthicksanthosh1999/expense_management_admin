'use client';

import { useDeleteBudgetHook, useFilterBudget } from '../_hooks/budget-hooks';
import { Card, CardContent } from '@/components/ui/card';
import { EllipsisVertical } from 'lucide-react';
import { CategoryIcon, FileBracesCornerIcon } from "@/lib/icon-center";
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
import ViewBudget from './view-budget';
import { IBudgetFilterResponseType, IBudgetType } from '@/constants/budgetTypes';
import BudgetForm from './budget-form';
import { TBudgetValidationSchema } from '@/validation_schema/budget-validation';
import "./index.css";


enum EBudgetStatus {
  ALL = "ALL",
  EXCEEDED = "EXCEEDED",
  ON_TRACK = "ON_TRACK",
  WARNING = "WARNING",
}

function BudgetCards() {
    
    const { mutate } = useDeleteBudgetHook();

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [deleteModelOpen, setDeleteModelOpen] = useState(false)
    const [updateModelOpen, setUpdateModelOpen] = useState(false)
    const [viewModelOpen, setViewModelOpen] = useState(false);
    const [selectedBudget, setSelectedBudget]=useState<IBudgetFilterResponseType | null>(null);
    const [selectedUpdateBudget, setUpdateSelectedBudget]=useState<TBudgetValidationSchema | null>(null);

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

    const handleUpdateModel = (budget:TBudgetValidationSchema) => {
        setUpdateModelOpen(true);
        setUpdateSelectedBudget(budget);
    };
  return (
    <div>
        {
            data && data?.data?.budgets.length === 0 ? (
            <div className='w-full bg-card min-h-100 flex items-center justify-center'>
                <h1 className='text-center'>No Budget Found</h1>
            </div>
            ) : (
                <div className='grid md:grid-cols-2 grid-cols-1 w-full gap-5'>
                    {
                    data?.data?.budgets?.map((item) =>(
                        <Card className="w-full" key={item?.id}>
                            <CardContent>
                                {/* HEADER */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-5">
                                        <div className="w-fit">
                                          <CategoryIcon category={item?.category} size={30} />
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
                                                <DropdownMenuItem onClick={()=>handleUpdateModel({  ...item, 
                                                    amount: Number(item.amount), 
                                                    alert: String(item.alert), 
                                                    status: item.status === EBudgetStatus.ALL ? undefined : item.status})}>
                                                        Update</DropdownMenuItem>
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
                </div>
            )
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

        {
    selectedUpdateBudget &&
        <BudgetForm
            mode="UPDATE"
            open={updateModelOpen}
            setOpen={setUpdateModelOpen}
            existingBudgetData={selectedUpdateBudget}
        />
    }
    </div>
  )
}

export default BudgetCards;
