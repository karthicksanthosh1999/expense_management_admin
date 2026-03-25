import { Card } from "@/components/ui/card";
import expenseIcon from "@/sources/icons/expense.png";
import incomeIcon from "@/sources/icons/income.png";
import balanceIcon from "@/sources/icons/balance.png";
import Image from "next/image";
import GoalCard from "./_components/goal-card";
import {
  calenderIcon,
  pieChartIcon,
  plusIcon,
  trendingUpIcon,
} from "@/lib/icon-center";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const page = async () => {
  const totals = await prisma.transaction.groupBy({
    by: ["transactionType"],
    _sum: { amount: true },
  });

  const income =
    totals.find((t) => t.transactionType === "Income")?._sum.amount || 0;
  const expense =
    totals.find((t) => t.transactionType === "Expense")?._sum.amount || 0;
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

  const quickAction = [
    {
      id: "0",
      link: "",
      icon: plusIcon,
      title: "Goal",
      description: "Create a new saving goal",
    },
    {
      id: "1",
      link: "",
      icon: trendingUpIcon,
      title: "View Badges",
      description: "See all achievements",
    },
    {
      id: "2",
      link: "",
      icon: calenderIcon,
      title: "Schedule Bills",
      description: "Manage payments",
    },
    {
      id: "3",
      link: "",
      icon: pieChartIcon,
      title: "View Report",
      description: "Detailed insights",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between gap-5 flex-wrap">
        {cardData.map((item, idx) => (
          <Card
            className="max-w-lg w-lg p-5 shadow-lg hover:shadow-blue-500"
            key={idx}>
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

      {/* QUICK ACTION CARD */}
      <h1 className="text-fontColor text-xl font-semibold">Quick Action</h1>
      <div className="grid grid-cols-4 gap-5">
        {quickAction.map(({ description, icon: Icon, id, link, title }) => (
          <Card
            key={id}
            className="w-full max-w-lg flex items-center justify-center">
            <Link href={link} className="w-fit">
              <Icon size={30} />
            </Link>
            <div>
              <h1 className="text-lg text-textColor text-center font-semibold">
                {title}
              </h1>
              <p className="text-gray-400 text-sm">{description}</p>
            </div>
          </Card>
        ))}
      </div>
      {/* GOAL CARD */}
      <GoalCard />
    </>
  );
};

export default page;
