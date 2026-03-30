import { Card, CardContent, CardHeader } from "@/components/ui/card";
import StatusChip from "@/components/status-chip";
import { Separator } from "@/components/ui/separator";
import DataLoader from "@/components/loders/DataLoader";
import { ITransaction } from "@/constants/transactionsTypes";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SmartphoneIcon, X } from "lucide-react";
import { getSingleTransaction } from "../_actions/get-single-transaction";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type props = {
  loading: boolean;
  transactionData: ITransaction[];
};

const TransactionHistory = ({ transactionData, loading }: props) => {
  const [transaction, setTransaction] = useState<ITransaction | null>(null);
  const handleModelClose = () => {
    setTransaction(null);
  };

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
                      onClick={() => setTransaction(item)}
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
        <DialogContent className="sm:max-w-lg bg-card">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl font-semibold">
                Transaction Details
              </DialogTitle>
              <X onClick={handleModelClose} />
            </div>
            <Separator />
          </DialogHeader>
          <section>
            <div className="flex items-center justify-center flex-col gap-2">
              <SmartphoneIcon size={30} />
              <h1 className="font-semibold text-4xl">₹{transaction?.amount}</h1>
              <p className="text-base font-normal">{transaction?.message}</p>
            </div>

            <div className="space-x-5 flex items-center justify-center">
              <Button variant={"outline"} className="h-10 w-30">
                Close
              </Button>
              <Button variant={"default"} className="h-10 w-30 text-white">
                Close
              </Button>
            </div>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransactionHistory;
