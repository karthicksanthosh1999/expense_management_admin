import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { IBudgetFilterResponseType } from "@/constants/budgetTypes";
import { CategoryIcon } from "@/lib/icon-center";

type TType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  budget:IBudgetFilterResponseType
};

const ViewBudget = ({
  open,
  setOpen,
  budget
}: TType) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-card border border-highlight">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-textColor font-semibold text-xl flex items-center gap-5">
            <CategoryIcon category={budget?.category} size={30} />
            <div className="flex flex-col items-start justify-start">
                <h3 className="capitalize text-2xl font-semibold">{budget?.category}</h3>
                <p className="text-base dark:text-gray-500 text-gray-700">{budget?.notes}</p>
            </div>
          </AlertDialogTitle>
          <Separator className='my-2'/>
          <div className="flex items-center justify-evenly w-full">
                <div className="size-20 dark:bg-[#1B1D31] bg-[#F0F0FE] flex flex-col items-center justify-center gap-1 rounded-lg">
                    <p className="text-base text-gray-400 font-semibold">Budget</p>
                    <p className="text-lg font-bold">₹{String(budget?.amount)}</p>
                </div>
                <div className="size-20 dark:bg-[#291A20] bg-[#FDECEC] flex flex-col items-center justify-center gap-1 rounded-lg">
                    <p className="text-base text-gray-400 font-semibold">Spent</p>
                    <p className="text-lg font-bold text-[#FF6900]">₹{String(budget?.spent)}</p>
                </div>
                <div className="size-20 dark:bg-[#132526] bg-[#E8F8F3] flex flex-col items-center justify-center gap-1 rounded-lg">
                    <p className="text-base text-gray-400 font-semibold">Left</p>
                    <p className="text-lg text-[#00C850] font-bold">₹{String(budget?.remaining)}</p>
                </div>
          </div>
          {/* PROGRESS BAR */}
        <div className="w-full space-y-3">
            <div className="flex items-center justify-between w-full">
                <p className="dark:text-gray-100 font-semibold text-gray-400">Progress</p>
                <h1 className="font-normal text-xs">₹{budget?.spent} / ₹{budget?.amount.toString()}</h1>
            </div>
                <Progress
                    value={budget?.usedPercentage}
                    id="progress-upload"
                    className='w-full'
                    />
        </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="bg-card">
            <Button className='text-white text-sm py-4 px-5' onClick={()=>setOpen(false)}>Close</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ViewBudget;
