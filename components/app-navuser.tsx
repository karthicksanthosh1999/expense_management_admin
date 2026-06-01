"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { LogOut } from "lucide-react"
import { useAuth } from "@/context/hooks/authHooks";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string,
    profileImage?: string
  }
}) {
    const {setUser, user:authUser} = useAuth()
    const navigate = useRouter();

   const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout", { id: authUser?.id });
      setUser({ id: "", name: "", email: "", verifiedEmail: false, profileImage: "", mobile: "", password: "", verifiedMobile: false });
      navigate.push("/");
      toast.success("User Logout Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarSeparator />
        <SidebarMenuButton className="cursor-pointer h-full text-center mt-1 text-base font-normal">
          <Avatar>
            <AvatarImage src={user?.profileImage} alt="shadcn" />
            <AvatarFallback>{user?.name?.charAt(0) ?? "N/A"}</AvatarFallback>
          </Avatar>
          {user?.name ?? "N/A"}
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="outline">
                <LogOut />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={'bg-card'}>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure, Your want to logout?</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="flex items-center justify-center gap-2">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className='text-white'onClick={handleLogout}>Logout</AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
