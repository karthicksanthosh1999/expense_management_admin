"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ChevronDown, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useId } from "react";

const dayFilter = [
  "Last 7 Days",
  "Last 30 Days",
  "Last 1 month",
  "This Year",
  "All Time",
];

const softFilter = [
  "Newest First",
  "Old First",
  "Height Amount",
  "Lowest Amount",
  "Name (A-Z)",
  "Name (Z-A)",
];

const categories = [
  { value: "all", label: "All Categories", icon: User },
  { value: "food", label: "Food", icon: User },
  { value: "travel", label: "Travel", icon: User },
  { value: "entertainment", label: "Entertainment", icon: User },
  { value: "shopping", label: "Shopping", icon: User },
  { value: "bills", label: "Bills", icon: User },
  { value: "income", label: "Income", icon: User },
];

export default function TransactionFilters() {
  const id = useId();

  return (
    <Card className="p-4">
      <CardContent className="space-y-3">
        {/* Tabs */}
        <Tabs defaultValue="all h-20">
          <TabsList className="grid grid-cols-4 place-content-center bg-transparent border justify-center py-7 border-blue-900/40  rounded-xl">
            <TabsTrigger className="p-3" value="all">
              All Transactions
            </TabsTrigger>
            <TabsTrigger className="p-3" value="income">
              Income
            </TabsTrigger>
            <TabsTrigger className="p-3" value="expenses">
              Expenses
            </TabsTrigger>
            <TabsTrigger className="p-3" value="pending">
              Pending
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-3 gap-4">
          <Select>
            <SelectTrigger className="w-full py-5">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {dayFilter.map((item) => (
                  <SelectItem value={item}>{item}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full py-5">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {softFilter.map((item) => (
                  <SelectItem value={item}>{item}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <RadioGroup defaultValue="all" className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <label
                key={item.value}
                className="cursor-pointer"
                htmlFor={`${id}-${item.value}`}>
                <RadioGroupItem
                  id={`${id}-${item.value}`}
                  value={item.value}
                  className="peer sr-only"
                />

                <span
                  className="
              rounded-xl border px-4 py-2 text-sm font-medium
              transition
              peer-data-[state=checked]:bg-primary
              peer-data-[state=checked]:text-white
              peer-data-[state=checked]:border-primary
              hover:bg-accent">
                  {item.label}
                </span>
              </label>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
