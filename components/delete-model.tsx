import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { Button } from "./ui/button";

type TType = {
  name: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleDelete: () => void;
};

const DeleteModel = ({
  name,
  open,
  setOpen,
  handleDelete,
}: TType) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-card border border-highlight">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-textColor font-semibold text-xl">
            Warning
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400 py-5 text-base">
            Are you sure?, You want to delete the {name ?? "N/A"}
          </AlertDialogDescription>
          <div className="flex items-center justify-evenly w-full">
            <Button
              variant={"outline"}
              type="button"
              className="text-lg font-normal text-white p-5 cursor-pointer"
              onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button
              variant={"default"}
              className="text-lg font-normal text-white p-5 cursor-pointer"
              onClick={() => handleDelete()}>
              Delete
            </Button>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModel;
