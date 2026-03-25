'use client';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator';
import { useDeleteCategoryHook, useGetAllCategoryHook } from '../_hooks/categoriesHooks';
import { Button } from '@/components/ui/button';
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon, Pencil, Trash } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination'
import DeleteModel from '@/components/delete-model';
import { useState } from 'react';
import CategoryForm from './form-categori';
import { ICategoryTypes } from '@/constants/categoryTypes';


const CategoryCard = () => {

    // USE-STATUS
    const [categoryDeleteModelOpen, setCategoryDeleteModelOpen] = useState(false);
    const [categoryUpdateModelOpen, setCategoryUpdateModelOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<ICategoryTypes | null>(null)

    // HOOKS
    const { data: categoryData } = useGetAllCategoryHook()
    const { mutate: categoryDeleteMutation } = useDeleteCategoryHook()


    // HANDLE UPDATE MODEL OPEN
    const handleUpdateModelOpen = (data: ICategoryTypes) => {
        setCategoryUpdateModelOpen(true)
        setSelectedCategory(data)
    }
    // HANDLE DELETE MODEL OPEN
    const handleDeleteModelOpen = (id: string) => {
        setCategoryDeleteModelOpen(true)
        setSelectedCategoryId(id)
    }

    // HANDLE CONFIRM DELETE
    const handleConfirmDelete = () => {
        categoryDeleteMutation(selectedCategoryId)
        setCategoryDeleteModelOpen(false)
    }

    const pages = [1, 2, 3]

    return (
        <>
            <Card className="w-full h-180 max-w-[50%]">
                <CardContent>
                    <CardHeader className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-color">
                            Categories List
                        </h1>
                        <p className="text-gray-400">Showing 1-8 of 16 transactions</p>
                    </CardHeader>
                    <Separator className={"my-5"} />
                    <section className="space-y-3 h-140 overflow-auto">
                        {categoryData && categoryData.data.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between border border-blue-900 hover:border-primary p-3 cursor-pointer rounded-xl transaction ease-in-out duration-500 hover:translate-y-1">
                                <div className="flex items-center justify-between w-full gap-5">
                                    <div className="flex flex-col items-start">
                                        <h1 className="text-color text-lg font-semibold tracking-wider">
                                            {item.title}
                                        </h1>
                                        <p className="text-gray-400 tracking-wider">
                                            {item.color}
                                        </p>
                                    </div>
                                    <div className='space-x-1'>
                                        <Button className='text-white p-5' size={'icon'} onClick={() => handleDeleteModelOpen(item.id!)} >
                                            <Trash size={40} />
                                        </Button>
                                        <Button className='text-white p-5' size={'icon'} onClick={() => handleUpdateModelOpen(item)}>
                                            <Pencil size={40} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                    <CardFooter className='bg-card'>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationLink href='#' aria-label='Go to first page' size='icon' className='rounded-full'>
                                        <ChevronFirstIcon className='size-6' />
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href='#' aria-label='Go to previous page' size='icon' className='rounded-full'>
                                        <ChevronLeftIcon className='size-6' />
                                    </PaginationLink>
                                </PaginationItem>
                                {pages.map(page => (
                                    <PaginationItem key={page}>
                                        <PaginationLink href={`#${page}`} isActive={page === 2} className='rounded-full'>
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationLink href='#' aria-label='Go to next page' size='icon' className='rounded-full'>
                                        <ChevronRightIcon className='size-6' />
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href='#' aria-label='Go to last page' size='icon' className='rounded-full'>
                                        <ChevronLastIcon className='size-6' />
                                    </PaginationLink>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </CardFooter>
                </CardContent>
            </Card>

            // UPDATE MODEL
            {
                selectedCategory &&
                <CategoryForm
                    open={categoryUpdateModelOpen}
                    setOpen={setCategoryUpdateModelOpen}
                    formMode='Update'
                    category={selectedCategory}
                />
            }

            // DELETE MODEL
            <DeleteModel
                open={categoryDeleteModelOpen}
                setOpen={setCategoryDeleteModelOpen}
                deleteDataId={selectedCategoryId}
                name='Category'
                handleDelete={handleConfirmDelete}
            />
        </>
    )
}

export default CategoryCard
