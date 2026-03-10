"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
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

const categories = [
  "All Categories",
  "Food",
  "Travel",
  "Entertainment",
  "Shopping",
  "Bills",
  "Income",
];

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

export default function TransactionFilters() {
  return (
    <Card className="p-4">
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
