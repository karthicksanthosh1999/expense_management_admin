import {
  CircleDollarSign,
  CircleQuestionMark,
  CreditCard,
  DollarSign,
  Laptop,
  Link,
  Mail,
  MoonStar,
  Phone,
  Shield,
  Smartphone,
  Sun,
  Timer,
  Trophy,
  UserRoundX,
} from "lucide-react";

type IconProps = {
  size?: number;
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
