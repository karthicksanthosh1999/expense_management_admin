'use client';

import { useEffect, useState } from "react";
import {
    trendingUpIcon,
    trendingDownIcon,
    walletIcon,
} from "@/lib/icon-center";
import { getDefaultDates } from "@/lib/getCurrentMonth";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { transactionAmount } from '../_actions/transactionAmount';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DataLoader from "@/components/loders/DataLoader";

// ✅ Types
type Filters = {
    startDate: Date | undefined;
    endDate: Date | undefined;
};

type TransactionData = {
    expense: number;
    income: number;
    total: number;
    balance: number;
};

const AmountCard = () => {
    const { startDate: defaultStart, endDate: defaultEnd } = getDefaultDates();

    // ✅ Typed state
    const [filters, setFilters] = useState<Filters>({
        startDate: defaultStart,
        endDate: defaultEnd,
    });

    const [data, setData] = useState<TransactionData>({
        expense: 0,
        income: 0,
        total: 0,
        balance: 0,
    });

    const [loading, setLoading] = useState<boolean>(false);

    // ✅ Fetch function
    const fetchData = async (customFilters: Filters = filters) => {
        try {
            setLoading(true);

            const res = await transactionAmount(customFilters);
            setData(res);

        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Initial load
    useEffect(() => {
        fetchData();
    }, []);

    // ✅ Update filter
    const updateFilter = (key: keyof Filters, value: Date | undefined) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    // ✅ Submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchData();
    };

    // ✅ Reset
    const handleReset = () => {
        const resetFilters: Filters = {
            startDate: defaultStart,
            endDate: defaultEnd,
        };

        setFilters(resetFilters);
        fetchData(resetFilters);
    };

    const cardData = [
        {
            title: "Total Expense",
            amount: data.expense,
            icon: trendingDownIcon,
            iconCategory: "expense" as const,
        },
        {
            title: "Total Income",
            amount: data.income,
            icon: trendingUpIcon,
            iconCategory: "income" as const,
        },
        {
            title: "Total Amount",
            amount: data.total,
            icon: walletIcon,
            iconCategory: "total" as const,
        },
        {
            title: "Balance",
            amount: data.balance,
            icon: walletIcon,
            iconCategory: "balance" as const,
        },
    ];

    return (
        <div>
            <h1 className="text-fontColor text-xl font-semibold">Filter</h1>

            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-3">
                                <Label>Start Date:</Label>
                                <DatePicker
                                    value={filters.startDate}
                                    onChange={(date: Date | undefined) =>
                                        updateFilter("startDate", date)
                                    }
                                    className="p-4 font-normal text-base"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label>End Date:</Label>
                                <DatePicker
                                    value={filters.endDate}
                                    onChange={(date: Date | undefined) =>
                                        updateFilter("endDate", date)
                                    }
                                    className="p-4 font-normal text-base"
                                />
                            </div>
                            <div className="">
                                <Button type="submit" className="px-8 py-5 text-textColor">
                                    Apply
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleReset}
                                    className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-5"
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <h1 className="text-fontColor text-xl font-semibold mt-5">
                Transactions
            </h1>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                {cardData.map(({ amount, icon: Icon, title, iconCategory }, idx) => (
                    <Card key={idx} className="max-w-sm w-full p-5 shadow-lg">
                        <div>
                            <div className="space-y-2">
                                <div className="w-fit">
                                    <Icon category={iconCategory} />
                                </div>
                                <p className="text-gray-400">{title}</p>
                            </div>
                            <Separator />
                            {
                                loading && <DataLoader />
                            }
                            <div className="mt-3">
                                <h1 className="text-4xl font-semibold">
                                    ₹{amount}
                                </h1>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

        </div>
    );
};

export default AmountCard;
