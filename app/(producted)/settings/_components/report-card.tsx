"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { useState } from "react";

const ReportCard = () => {
  const [currency, setCurrency] = useState("");
  const [weeklyReport, setWeeklyReport] = useState(false);
  const currencyList = [
    {
      label: "INR",
      value: "INR",
    },
    {
      label: "EUR",
      value: "EUR",
    },
    {
      label: "USD",
      value: "USD",
    },
  ];

  const handleSettingsChange = (
    type: "currency" | "report",
    value: string | boolean,
  ) => {
    if (type === "currency") {
      setCurrency(value as string);
      toast.success(`Currency changed to ${value}`);
      console.log("Currency:", value, "Weekly Report:", weeklyReport);
    }
    if (type === "report") {
      setWeeklyReport(value as boolean);
      toast.success(value ? "Weekly report enabled" : "Weekly report disabled");
      console.log("Currency:", currency, "Weekly Report:", value);
    }
  };

  return (
    <Card className="max-w-lg">
      <CardHeader className="text-2xl font-semibold">
        Report & Money Settings
      </CardHeader>
      <Separator />
      <CardContent>
        <FieldGroup className="max-w-sm space-y-3">
          {/* Currency */}
          <div className="space-y-5">
            <Label>Select Currency Type:</Label>

            <Field orientation="horizontal">
              <Select
                value={currency}
                onValueChange={(value) =>
                  handleSettingsChange("currency", value)
                }>
                <SelectTrigger className="cursor-pointer w-full max-w-48">
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Currency</SelectLabel>
                    {currencyList.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>

          {/* Weekly Report */}
          <div className="space-y-5">
            <Label>Weekly Automatic Mail Report:</Label>

            <Field orientation="horizontal">
              <Checkbox
                id="terms-checkbox"
                className="cursor-pointer border-highlight size-6"
                checked={weeklyReport}
                onCheckedChange={(value) =>
                  handleSettingsChange("report", value)
                }
              />
              <Label
                htmlFor="terms-checkbox"
                className="cursor-pointer text-gray-600 dark:text-gray-300 font-normal">
                Generate Weekly report
              </Label>
            </Field>
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
