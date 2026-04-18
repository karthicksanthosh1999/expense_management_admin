import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import pdfIcon from "@/sources/icons/pdf.png";
import excelIcon from "@/sources/icons/sheets.webp";
import Image from "next/image";
import { exportToExcel } from "./export-excel";
import { ITransaction } from "@/constants/transactionsTypes";
import toast from "react-hot-toast";
import { exportPdf } from "./export-pdf";
import { useAuth } from "@/context/hooks/authHooks";

type TProps = {
    open: boolean,
    setOpen: (open: boolean) => void,
    transactions: ITransaction[]
}

export function ExportModel({ open, setOpen, transactions }: TProps) {
    const { user } = useAuth()

    const handleExcelExport = () => {
        exportToExcel(transactions)
        toast.success("Excel Export Successfully")
        setOpen(false)
    }
    const handlePdfExport = () => {
        exportPdf(transactions, user!)
        toast.success("PDF Export Successfully")
        setOpen(false)
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="bg-card">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-semibold tracking-wide">Which type your want to export?</AlertDialogTitle>
                </AlertDialogHeader>
                <Separator />
                <div className="flex items-center justify-center space-x-10">
                    <button className="space-y-2 bg-transparent" onClick={handlePdfExport}>
                        <Image
                            src={pdfIcon}
                            alt="pdf"
                            height={70}
                            width={50}
                            className="cursor-pointer hover:shadow-[0px_4px_16px_rgba(59,130,246,0.4),0px_8px_24px_rgba(59,130,246,0.3),0px_16px_56px_rgba(59,130,246,0.2)] transition-shadow duration-300"
                        />

                        <span className="text-sm font-normal text-center">PDF</span>
                    </button>
                    <button className="space-y-2 bg-transparent" onClick={handleExcelExport}>
                        <Image
                            src={excelIcon}
                            alt="pdf"
                            height={70}
                            width={50}
                            className="cursor-pointer hover:shadow-[0px_4px_16px_rgba(59,130,246,0.4),0px_8px_24px_rgba(59,130,246,0.3),0px_16px_56px_rgba(59,130,246,0.2)] transition-shadow duration-300"
                        />
                        <span className="text-sm font-normal text-center">Excel</span>
                    </button>
                </div>
                <Separator />
                <div className="flex items-center justify-center">
                    <button className="transaction duration-300 ease-in-out cursor-pointer px-4 py-2 text-base rounded-lg border border-highlight hover:bg-blue-600 hover:text-white" onClick={() => setOpen(false)}>Close</button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
