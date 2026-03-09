import { Card } from "@/components/ui/card";
import expenseIcon from "@/sources/icons/expense.png";
import incomeIcon from "@/sources/icons/income.png";
import balanceIcon from "@/sources/icons/balance.png";
import Image from "next/image";

const page = () => {
  const cardData = [
    {
      title: "Total Expense",
      amount: "20,00,000",
      icon: expenseIcon,
    },
    {
      title: "Total Income",
      amount: "20,00,000",
      icon: incomeIcon,
    },
    {
      title: "Balance",
      amount: "20,00,000",
      icon: balanceIcon,
    },
  ];

  return (
    <div className="flex items-center justify-between gap-5 flex-wrap">
      {cardData.map((item) => (
        <Card className="max-w-lg w-lg p-5 shadow-lg hover:shadow-blue-500">
          <div>
            <Image src={item.icon} alt="image" height={50} width={50} />
            <div className="mt-5">
              <p className="text-gray-400">{item.title}</p>
              <h1 className="text-4xl font-semibold">${item.amount}</h1>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default page;
