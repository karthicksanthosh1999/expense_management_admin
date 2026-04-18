import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ITransaction } from "@/constants/transactionsTypes";
import { dateFormat } from "@/lib/dateFormat ";


const IGNORE_FIELDS = ["internalId", "updatedAt", "createdAt", "id", "userId"];
const DATE_FIELDS = ["transactionDate"];
const HEADER_MAP: Record<string, string> = {
    transactionDate: "Transaction Date",
    amount: "Amount",
    message: "Description",
    category: "Category",
    transactionType: "Transaction Type",
};

export const exportToExcel = (
    data: ITransaction[],
    fileName = "data.xlsx"
) => {
    const formattedData = data.map((item) => {
        const newItem: Record<string, any> = {};

        Object.keys(item).forEach((key) => {
            if (IGNORE_FIELDS.includes(key)) return;

            let value = item[key as keyof ITransaction];

            // Format date
            if (DATE_FIELDS.includes(key) && value) {
                value = dateFormat(value);
            }

            // ✅ Apply custom header
            const newKey = HEADER_MAP[key] || key;

            newItem[newKey] = value;
        });

        return newItem;
    });
    if (!data?.length) return;

    const orderedHeaders = Object.keys(HEADER_MAP);

    const worksheet = XLSX.utils.json_to_sheet(formattedData, {
        header: orderedHeaders.map((key) => HEADER_MAP[key]),
    });

    const headers = Object.keys(HEADER_MAP).map(
        (key) => HEADER_MAP[key]
    );

    headers.forEach((_, index) => {
        const cellRef = XLSX.utils.encode_cell({ r: 0, c: index });

        if (!worksheet[cellRef]) return;

        worksheet[cellRef].s = {
            font: { bold: true },
            alignment: { horizontal: "center", vertical: "center" },
        };
    });

    worksheet["!cols"] = headers.map((key) => ({
        wch:
            Math.max(
                key.length,
                ...formattedData.map((row) =>
                    row[key] ? row[key].toString().length : 10
                )
            ) + 2,
    }));

    // 🔥 Step 5: Workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
        cellStyles: true,
    });

    saveAs(
        new Blob([excelBuffer], { type: "application/octet-stream" }),
        fileName
    );
};
