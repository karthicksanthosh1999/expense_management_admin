'use client';

import SecondHeader from '@/components/second-header';
import { Button } from '@/components/ui/button';
import CategoryForm from './_components/form-categori';
import { useState } from 'react';
import CategoryCard from './_components/categories-card';

const page = () => {

    const [categoryCreateModelOpen, setCategoryCreateModelOpen] = useState(false);

    return (
        <div>
            <SecondHeader currentPage='Categories' >
                <Button
                    className={"text-sm text-textColor p-5"}
                    onClick={() => setCategoryCreateModelOpen(true)}
                >
                    Add Category
                </Button>
            </SecondHeader>

            <CategoryCard />

            <CategoryForm
                open={categoryCreateModelOpen}
                setOpen={setCategoryCreateModelOpen}
                formMode='Create'
            />
        </div>
    )
}

export default page
