import {
  Calendar,
  ChartPie,
  ShoppingBag,
  CircleQuestionMark,
  CreditCard,
  DollarSign,
  Key,
  Laptop,
  Link,
  Mail,
  MoonStar,
  Phone,
  Plus,
  Shield,
  ShieldCheck,
  Smartphone,
  Sun,
  Timer,
  TrendingDown,
  TrendingUp,
  Trophy,
  UserRoundX,
  Wallet,
  Home,
  Car,
  Utensils,
  Hamburger,
  ChartNoAxesCombined,
  CircleStar,
} from "lucide-react";

export const categoryConfig = {
  other: {
    icon: CircleQuestionMark,
    bg: "from-gray-400 to-gray-500",
  },
  electronics: {
    icon: Smartphone,
    bg: "from-blue-400 to-blue-500",
  },
  home: {
    icon: Home,
    bg: "from-green-400 to-green-500",
  },
  transport: {
    icon: Car,
    bg: "from-yellow-400 to-yellow-500",
  },
  food: {
    icon: Utensils,
    bg: "from-red-400 to-red-500",
  },
  shop: {
    icon: ShoppingBag,
    bg: "bg-linear-to-r from-red-500 to-orange-500",
  },
  snacks: {
    icon: Hamburger,
    bg: "bg-linear-to-r from-red-500 to-orange-500",
  },
  rent: {
    icon: Home,
    bg: "bg-linear-to-r from-red-500 to-orange-500",
  },
  sip: {
    icon: ChartNoAxesCombined,
    bg: "bg-linear-to-r from-red-500 to-orange-500",
  },
  gold: {
    icon: CircleStar,
    bg: "bg-linear-to-r from-red-500 to-orange-500",
  },
};

type Category = keyof typeof categoryConfig;

type IconProps = {
  category: Category | string;
  size?: number;
};

export const CategoryIcon = ({ category, size = 23 }: IconProps) => {
  const config = categoryConfig[category as Category] || categoryConfig.other;

  const Icon = config.icon;

  return (
    <div className={`bg-linear-to-r ${config.bg} p-2 rounded-lg`}>
      <Icon size={size} className="text-white" />
    </div>
  );
};

export const QuestionMarkIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-purple-400 to-purple-500 p-2 rounded-lg">
      <CircleQuestionMark size={size} className="text-white" />
    </div>
  );
};
export const smartphoneIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-purple-400 to-purple-500 p-2 rounded-lg">
      <Smartphone size={size} className="text-white" />
    </div>
  );
};
export const moneyIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-red-500 to-orange-500 p-2 rounded-lg">
      <DollarSign size={size} className="text-white" />
    </div>
  );
};
export const shieldIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-b from-lime-400 to-zinc-300 p-2 rounded-lg">
      <Shield size={size} className="text-white" />
    </div>
  );
};
export const linkIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-fuchsia-500 to-pink-500 p-2 rounded-lg">
      <Link size={size} className="text-white" />
    </div>
  );
};
export const userCancelIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-red-500 to-orange-500 p-2 rounded-lg">
      <UserRoundX size={size} className="text-white" />
    </div>
  );
};
export const bankIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-red-500 to-orange-500 p-2 rounded-lg">
      <UserRoundX size={size} className="text-white" />
    </div>
  );
};
export const trophyIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-b from-pink-400 to-violet-400 p-2 rounded-lg">
      <Trophy size={size} className="text-white" />
    </div>
  );
};
export const creditCardIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-red-500 to-orange-500 p-2 rounded-lg">
      <CreditCard size={size} className="text-white" />
    </div>
  );
};
export const emailIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-purple-200 via-indigo-400 to-violet-600 p-2 rounded-lg">
      <Mail size={size} className="text-white" />
    </div>
  );
};
export const phoneIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-amber-500 via-orange-500 to-red-500 p-2 rounded-lg">
      <Phone size={size} className="text-white" />
    </div>
  );
};
export const timerIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-indigo-500 via-blue-500 to-cyan-500 p-2 rounded-lg">
      <Timer size={size} className="text-white" />
    </div>
  );
};
export const sunIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-gray-600 via-blue-500 to-cyan-400 p-2 rounded-lg">
      <Sun size={size} className="text-white" />
    </div>
  );
};
export const moonIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-zinc-500 to-slate-400 p-2 rounded-lg">
      <MoonStar size={size} className="text-white" />
    </div>
  );
};
export const laptopIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-indigo-500 to-blue-500 p-2 rounded-lg">
      <Laptop size={size} className="text-white" />
    </div>
  );
};
export const plusIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-pink-500 to-rose-500 p-2 rounded-lg">
      <Plus size={size} className="text-white" />
    </div>
  );
};
export const calenderIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-indigo-400 to-cyan-400 p-2 rounded-lg">
      <Calendar size={size} className="text-white" />
    </div>
  );
};
export const pieChartIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-indigo-400 to-cyan-400 p-2 rounded-lg">
      <ChartPie size={size} className="text-white" />
    </div>
  );
};
export const trendingUpIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-indigo-400 to-cyan-400 p-2 rounded-lg">
      <TrendingUp size={size} className="text-white" />
    </div>
  );
};
export const trendingDownIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-indigo-400 to-cyan-400 p-2 rounded-lg">
      <TrendingDown size={size} className="text-white" />
    </div>
  );
};
export const walletIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-indigo-400 to-cyan-400 p-2 rounded-lg">
      <Wallet size={size} className="text-white" />
    </div>
  );
};
export const KeyIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-indigo-400 to-cyan-400 p-2 rounded-lg">
      <Key size={size} className="text-white" />
    </div>
  );
};
export const verifiedIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-indigo-400 to-cyan-400 p-2 rounded-lg">
      <ShieldCheck size={size} className="text-white" />
    </div>
  );
};
