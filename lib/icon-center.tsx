import {
  CircleDollarSign,
  CircleQuestionMark,
  CreditCard,
  DollarSign,
  Link,
  Shield,
  Smartphone,
  Trophy,
  UserRoundX,
} from "lucide-react";

type IconProps = {
  size?: number;
};

export const QuestionMarkIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-purple-400 to-purple-500 p-2 rounded-lg">
      <CircleQuestionMark size={size} />
    </div>
  );
};
export const smartphoneIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-purple-400 to-purple-500 p-2 rounded-lg">
      <Smartphone size={size} />
    </div>
  );
};
export const moneyIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-red-500 to-orange-500 p-2 rounded-lg">
      <DollarSign size={size} />
    </div>
  );
};
export const shieldIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-b from-lime-400 to-zinc-300 p-2 rounded-lg">
      <Shield size={size} />
    </div>
  );
};
export const linkIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-fuchsia-500 to-pink-500 p-2 rounded-lg">
      <Link size={size} />
    </div>
  );
};
export const userCancelIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-red-500 to-orange-500 p-2 rounded-lg">
      <UserRoundX size={size} />
    </div>
  );
};
export const bankIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-red-500 to-orange-500 p-2 rounded-lg">
      <UserRoundX size={size} />
    </div>
  );
};
export const trophyIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-b from-pink-400 to-violet-400 p-2 rounded-lg">
      <Trophy size={size} />
    </div>
  );
};
export const creditCardIcon = ({ size = 23 }: IconProps) => {
  return (
    <div className="bg-linear-to-r from-red-500 to-orange-5000 p-2 rounded-lg">
      <CreditCard size={size} />
    </div>
  );
};
