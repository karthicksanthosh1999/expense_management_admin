import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import StatusChip from "@/components/status-chip";
import { Separator } from "@/components/ui/separator";
import DataLoader from "@/components/loders/DataLoader";
import {
  ITransaction,
  ITransactionFilteredResponse,
  ITransactionFilterType,
} from "@/constants/transactionsTypes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, X, Trash, Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "@/lib/icon-center";
import { dateFormat } from "@/lib/dateFormat ";
import { TransactionForm } from "./form-transaction";
import { TTransactionValidationSchemaType } from "@/validation_schema/transaction-validatino";
import CardPagination from "@/components/card-pagination";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useDeleteTransactionHook } from "../_hooks/transaction-hook";
import DeleteModel from "@/components/delete-model";

type props = {
  loading: boolean;
  transactionData: ITransactionFilteredResponse;
  appliedFilters: ITransactionFilterType;
  setAppliedFilters: React.Dispatch<
    React.SetStateAction<ITransactionFilterType>
  >;
};

const TransactionHistory = ({
  transactionData,
  loading,
  setAppliedFilters,
  appliedFilters,
}: props) => {

  const [transactionModelOpen, setTransactionModelOpen] = useState(false);
  const [transactionUpdateModelOpen, setTransactionUpdateModelOpen] =useState(false);
  const [transactionDeleteModelOpen, setTransactionDeleteModelOpen] =useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TTransactionValidationSchemaType | null>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<ITransaction | null>(null);

  const { mutate } = useDeleteTransactionHook()

  const handleModelClose = () => {
    setTransactionModelOpen(false);
    setTransaction(null);
  };

  const handleModelOpen = () => {
    setTransactionModelOpen(true);
  };

  const handleGoalEdit = (data: ITransaction) => {
    setTransactionUpdateModelOpen(true);
    setSelectedTransaction(data);
  };

  const handleDelete = (id: string) => {
      setSelectedTransactionId(id)
      setTransactionDeleteModelOpen(true)
       setTransactionModelOpen(false);
  }

  const handleConfirmDelete = () => {
    if(selectedTransactionId){
      mutate(selectedTransactionId)
      setSelectedTransactionId(null)
      setTransactionUpdateModelOpen(false);
    }
  }

  return (
    <>
      <Dialog
        open={transactionModelOpen}
        onOpenChange={setTransactionModelOpen}>
        <Card className="w-full">
          <CardHeader className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-color">
              Transaction History
            </h1>
            <p className="text-gray-400">
              Showing {transactionData?.pagination?.page}-
              {transactionData?.pagination?.totalPages} of{" "}
              {transactionData?.pagination?.total} transactions
            </p>
          </CardHeader>
          <div className="relative">
            <Separator className={""} />
            {loading && (
              <div className="absolute top-0 left-0 w-full">
                <DataLoader />
              </div>
            )}
          </div>
          <CardContent className="h-250 overflow-auto">
            <section className="space-y-3">
              {transactionData?.transactions &&
              transactionData?.transactions.length === 0 ? (
                <div className="flex items-center justify-center min-h-screen">
                  <h1 className="text-xl font-normal">No Transaction Found</h1>
                </div>
              ) : (
                transactionData?.transactions.map((item, idx) => (
                  <ContextMenu>
                  <ContextMenuTrigger>
                  <div
                    onClick={() => {
                      handleModelOpen();
                      setTransaction(item);
                    }}
                    key={idx}
                    className="flex items-center justify-between border border-blue-900 hover:border-primary p-3 cursor-pointer rounded-xl transaction ease-in-out duration-500 hover:translate-y-1">
                    <div className="flex items-center gap-5">
                      <div className="flex flex-col items-start">
                        <div className="flex items-center gap-3">
                          <CategoryIcon category={item?.category!} size={20} />
                          <h1 className="text-color text-lg font-semibold tracking-wider w-fit">
                            {item.message}
                          </h1>
                        </div>
                        <p className="text-gray-300 tracking-wider font-semibold mt-2">
                          {dateFormat(item?.transactionDate!) ?? "N/A"}
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
                        ${item.amount.toString()}
                      </h1>
                      <span className="text-color text-lg font-semibold">
                        <StatusChip status={item.transactionType} />
                      </span>
                    </div>
                  </div>
                  </ContextMenuTrigger>
                    <ContextMenuContent className={'space-y-1 w-50'}>
                    <ContextMenuItem>
                      <X/>
                      Back
                    </ContextMenuItem>
                    <Separator/>
                  <ContextMenuGroup>
                    <ContextMenuLabel>Events</ContextMenuLabel>
                    <ContextMenuItem             onClick={() => {
                      handleModelOpen();
                      setTransaction(item);
                    }}>
                      <Eye/>
                      View
                    </ContextMenuItem>
                    <ContextMenuItem onClick={()=>handleGoalEdit(item)}>
                      <Pencil/>
                      Update</ContextMenuItem>
                    <ContextMenuItem onClick={()=>handleDelete(item?.id)}>
                      <Trash/>
                      Delete
                    </ContextMenuItem>
                  </ContextMenuGroup>
                  </ContextMenuContent>
                  </ContextMenu>
                ))
              )}
            </section>
          </CardContent>
          <CardFooter className="bg-card">
            <CardPagination
              totalData={appliedFilters.total ?? 0}
              currentPage={appliedFilters.page ?? 0}
              totalPages={appliedFilters.totalPages ?? 0}
              rowsPerPage={appliedFilters.limit ?? 0}
              onPageChange={(page) =>
                setAppliedFilters((prev) => ({ ...prev, page }))
              }
              onRowsChange={(limit) =>
                setAppliedFilters((prev) => ({
                  ...prev,
                  limit,
                  page: 1,
                }))
              }
            />
          </CardFooter>
        </Card>

        {/* TRANSACTION MODEL */}
        <DialogContent className="sm:max-w-lg bg-card border border-highlight">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl font-semibold">
                Transaction Details
              </DialogTitle>
              <X onClick={handleModelClose} className="cursor-pointer" />
            </div>
            <Separator className={'my-2'} />
          </DialogHeader>
          <section>
            <div className="flex items-center justify-center flex-col gap-2">
              <CategoryIcon category={transaction?.category!} size={30} />
              <h1 className="font-semibold text-4xl">
                ₹{transaction?.amount.toString()}
              </h1>
              <p className="text-base font-normal pb-5">
                {transaction?.message}
              </p>
            </div>

            <div>
              <Card>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <p>Transaction Type:</p>
                    <span>
                      {transaction?.transactionType && (
                        <StatusChip status={transaction.transactionType} />
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p>Transaction Category:</p>
                    <p className="uppercase">{transaction?.category}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p>Transaction Date:</p>
                    {dateFormat(transaction?.transactionDate!) ?? "N/A"}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-x-5 flex items-center justify-center mt-5">
              <Button variant={"outline"} className="h-10 w-30">
                Download Recept
              </Button>
              <Button variant={"destructive"} className="h-10 w-30" onClick={()=>handleDelete(transaction?.id!)}>
                Delete
              </Button>
              <Button
                variant={"default"}
                className="h-10 w-30 text-white"
                onClick={() => handleGoalEdit(transaction!)}>
                Edit
              </Button>
            </div>
          </section>
        </DialogContent>
      </Dialog>
      {selectedTransaction && (
        <TransactionForm
          formType={selectedTransaction?.transactionType}
          mode="UPDATE"
          open={transactionUpdateModelOpen}
          setOpen={setTransactionUpdateModelOpen}
          existingTransactionData={selectedTransaction}
        />
      )}
        {selectedTransactionId && (
          <DeleteModel 
            name="Transaction"
            open={transactionDeleteModelOpen}
            setOpen={setTransactionDeleteModelOpen}
            handleDelete={handleConfirmDelete}
          />
        )
      }
    </>
  );
};

export default TransactionHistory;
