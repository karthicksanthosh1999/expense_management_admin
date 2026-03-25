'use client'
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { ModeToggle } from "./theme-doggle";
import { ProfileDropdown } from "./profile-dropdown";
import { useAuth } from "@/context/hooks/authHooks";

type TProps = {
  children: ReactNode;
};
export default function GlobalHeader({ children }: TProps) {

  const { user, setUser } = useAuth()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-card flex h-20 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" size={"lg"} />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <section className="flex w-full items-center justify-between">
            <div className="">
              <h1 className="text-textColor font-bold text-xl">Settings</h1>
              <p className="text-gray-400 font-normal text-xs">
                Welcome back {user?.data?.fullname}!
              </p>
            </div>
            <div className="w-fit mr-5 flex items-center justify-center gap-4">
              <ModeToggle />
              {
                user &&
                <ProfileDropdown logout={setUser} user={user} />
              }
            </div>
          </section>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
