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
import { useEffect, useState } from "react";
import { Currency } from "@prisma/client";
import { useGetSettingsHooks, useUpdateSettingHook } from "../_hooks/settingHooks";
import { useAuth } from "@/context/hooks/authHooks";

interface ICurrency {
    label : string
    value : Currency
  }


const ReportCard = () => {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [weeklyReport, setWeeklyReport] = useState(false);
  const { user } = useAuth()

  const currencyList:ICurrency[] = [
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
  const { mutate } = useUpdateSettingHook();
  const { data } = useGetSettingsHooks(user?.id);

useEffect(() => {
  if (data?.data) {
    setCurrency(data.data.currency as Currency);

    setWeeklyReport(
      data.data.enable_monthly_transaction_report as boolean
    );
  }
}, [data]);
const handleSettingsChange = async (
  type: "currency" | "report",
  value: Currency | boolean,
) => {
  try {
    if (type === "currency") {
      const selectedCurrency = value as Currency;
      setCurrency(selectedCurrency);
      mutate({ currency:selectedCurrency, enable_monthly_transaction_report: weeklyReport, notes:"Sample", userId: user?.id });
    }

    if (type === "report") {
      const reportEnabled = value as boolean;
      setWeeklyReport(reportEnabled);
      mutate({ currency, enable_monthly_transaction_report: reportEnabled, notes:"Sample", userId: user?.id });
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to update settings");
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
                  handleSettingsChange("currency", value as Currency)
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
