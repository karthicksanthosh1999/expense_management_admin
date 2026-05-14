import { ITransaction } from "@/constants/transactionsTypes";
import { IUser } from "@/constants/UserTypes";
import { dateFormat } from "@/lib/dateFormat ";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPdf = (data: ITransaction[], user: IUser) => {
  const doc = new jsPDF();

  // ✅ Title
  doc.setFontSize(16);
  doc.text("Transaction Report", 105, 15, { align: "center" });

  // ✅ User Details (Top Left)
  doc.setFontSize(10);

  doc.text(`Name: ${user?.name}`, 14, 25);
  doc.text(`Email: ${user?.email}`, 14, 30);

  // ✅ Date / Metadata (Top Right)
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 25);
  doc.text(`Phone: ${user?.mobile}`, 150, 30);

  // ✅ Table
  autoTable(doc, {
    startY: 45,

    head: [["S.No", "Transaction Date", "Amount", "Status"]],
    body: data.map((item, index) => [
      index + 1,
      dateFormat(item.transactionDate),
      item.amount,
      item.transactionType,
    ]),

    headStyles: {
      fontStyle: "bold",
      halign: "center",
    },

    columnStyles: {
      0: { halign: "center" },
      1: { halign: "center" },
      2: { halign: "center" },
    },
  });

  doc.save(`${new Date().toLocaleDateString()}_transactions.pdf`);
};
