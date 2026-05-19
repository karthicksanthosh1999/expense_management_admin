import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/constants/UserTypes";
import api from "@/lib/api";
import { BadgeCheckIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type TProps = {
  logout: (user: null) => void;
  user: IUser | null;
};

export function ProfileDropdown({ logout, user }: TProps) {
  const navigate = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout", { id: user?.id });
      logout(null);
      navigate.push("/");
      toast.success("User Logout Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={user?.profileImage} alt="shadcn" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheckIcon />
            Account
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleLogout()}>
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
