import { Card, CardContent, CardHeader } from "@/components/ui/card";
import StatusChip from "@/components/status-chip";
import { Separator } from "@/components/ui/separator";
import DataLoader from "@/components/loders/DataLoader";
import { ITransaction } from "@/constants/transactionsTypes";
import { format } from "date-fns";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type props = {
  loading: boolean;
  transactionData: ITransaction[];
};

const TransactionHistory = ({ transactionData, loading }: props) => {
  const [transactionDetailsModel, setTransactionDetailModel] = useState(false);

  return (
    <>
      <Dialog>
        <DialogTrigger className={"w-full"}>
          <Card className="w-full h-250">
            <CardContent>
              <CardHeader className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-color">
                  Transaction History
                </h1>
                <p className="text-gray-400">Showing 1-8 of 16 transactions</p>
              </CardHeader>
              <div className="relative">
                <Separator className={"my-5"} />
                {loading && (
                  <div className="absolute top-1 left-0 w-full">
                    <DataLoader />
                  </div>
                )}
              </div>
              <section className="space-y-3">
                {transactionData &&
                  transactionData.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between border border-blue-900 hover:border-primary p-3 cursor-pointer rounded-xl transaction ease-in-out duration-500 hover:translate-y-1">
                      <div className="flex items-center gap-5">
                        <div className="flex flex-col items-start">
                          <h1 className="text-color text-lg font-semibold tracking-wider">
                            {item.message}
                          </h1>
                          <p className="text-gray-400 tracking-wider">
                            {format(item.transactionDate, "dd-mm-yyyy")}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h1
                          className="text-lg font-semibold"
                          style={{
                            color:
                              item.transactionType === "EXPENSE"
                                ? "#fb2c36"
                                : "oklch(72.3% 0.219 149.579)",
                          }}>
                          ${item.amount}
                        </h1>
                        <p className="text-color text-lg font-semibold">
                          <StatusChip status={item.transactionType} />
                        </p>
                      </div>
                    </div>
                  ))}
              </section>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransactionHistory;
