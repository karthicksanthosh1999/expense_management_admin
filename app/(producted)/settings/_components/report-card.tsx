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

const ReportCard = () => {
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

  return (
    <Card className="max-w-lg">
      <CardHeader className="text-2xl font-semibold">
        Report & Money Settings
      </CardHeader>
      <Separator />
      <CardContent>
        <FieldGroup className="max-w-sm space-y-3">
          <div className="space-y-5">
            <Label>Select Currency Type: </Label>
            <Field orientation={"horizontal"}>
              <Select>
                <SelectTrigger className="cursor-pointer w-full max-w-48">
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Currency</SelectLabel>
                    {currencyList.map((item) => (
                      <SelectItem value={item.value}>{item.label}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="space-y-5">
            <Label>Weekly Automatic Mail Report: </Label>
            <Field orientation="horizontal">
              <Checkbox
                id="terms-checkbox"
                className="cursor-pointer"
                name="terms-checkbox"
              />
              <Label htmlFor="terms-checkbox" className="cursor-pointer">
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
