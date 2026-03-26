import { Card } from "@/components/ui/card";
import expenseIcon from "@/sources/icons/expense.png";
import incomeIcon from "@/sources/icons/income.png";
import balanceIcon from "@/sources/icons/balance.png";
import GoalCard from "./_components/goal-card";
import {
  calenderIcon,
  pieChartIcon,
  plusIcon,
  trendingUpIcon,
  trendingDownIcon,
  walletIcon,
} from "@/lib/icon-center";
import Link from "next/link";
import { transactionAmount } from "./_actions/transactionAmount";

const page = async () => {
  const { expense, income, total } = await transactionAmount();

  const cardData = [
    {
      title: "Total Expense",
      amount: expense,
      icon: trendingDownIcon,
    },
    {
      title: "Total Income",
      amount: income,
      icon: trendingUpIcon,
    },
    {
      title: "Balance",
      amount: total,
      icon: walletIcon,
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
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 place-items-center justify-center">
        {cardData.map(({ amount, icon: Icon, title }, idx) => (
          <Card
            className="max-w-sm w-full p-5 shadow-lg hover:shadow-blue-500"
            key={idx}>
            <div>
              <div className="w-fit">
                <Icon />
              </div>
              <div className="mt-5">
                <p className="text-gray-400">{title}</p>
                <h1 className="text-4xl font-semibold">₹{amount}</h1>
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
