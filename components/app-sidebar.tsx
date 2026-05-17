"use client";

import * as React from "react";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  ArrowRightLeft,
  Headset,
  Layers2,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { NavUser } from "./app-navuser";
import { useAuth } from "@/context/hooks/authHooks";
import { Card, CardContent } from "./ui/card";
import { getDefaultDates } from "@/lib/getCurrentMonth";
import { formatted } from "@/lib/amount-converter";
import { useOverAllTransactionDetailsHook } from "@/app/(producted)/transactions/_hooks/transaction-hook";
import ButtonLoading from "./loaders/ButtonLoading";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
  const { user } = useAuth();

  const { startDate: defaultStart, endDate: defaultEnd } = getDefaultDates();

  const { data: amountDetails, isLoading } = useOverAllTransactionDetailsHook({
    startDate: defaultStart,
    endDate: defaultEnd,
  });
  const data = {
    navMain: [
      {
        title: "Getting Started",
        url: "#",
        items: [
          {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
            isActive: pathName === "/dashboard",
          },
          {
            title: "Transactions",
            url: "/transactions",
            icon: ArrowRightLeft,
            isActive: pathName === "/transactions",
          },
          {
            title: "Goals",
            url: "/goal",
            icon: Layers2,
            isActive: pathName === "/goal",
          },
          {
            title: "Settings",
            url: "/settings",
            icon: Settings,
            isActive: pathName === "/settings",
          },
          {
            title: "Support",
            url: "/support",
            icon: Headset,
            isActive: pathName === "/support",
          },
        ],
      },
    ],
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher />
      </SidebarHeader>
      <SidebarContent className="bg-card">
        <Card className="m-2">
          <CardContent>
            <div>
              <div className="flex justify-between">
                <h3 className="text-gray-400 text-lg font-normal">
                  Total balance
                </h3>
                <span className="relative flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-highlight"></span>
                </span>
              </div>
              {isLoading ? (
                <div className="py-2 float-start">
                  <ButtonLoading />
                </div>
              ) : (
                <h1 className="text-highlight font-semibold text-base">
                  {formatted(amountDetails?.data?.balance ?? 0)}
                </h1>
              )}
            </div>
          </CardContent>
        </Card>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map(({ icon: Icon, title, url, isActive }) => (
                  <SidebarMenuItem key={title} className="p-2 ">
                    <SidebarMenuButton
                      className={`flex items-center gap-2 py-2 px-2 text-base font-normal transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-md ${
                        isActive
                          ? "bg-highlight text-white hover:bg-highlight"
                          : "text-gray-400 hover:text-white hover:bg-highlight hover:translate-x-0.75"
                      }`}
                      isActive={isActive}
                      render={<Link href={url} />}>
                      {Icon && <Icon size={18} />}
                      {title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="w-full">
        {user && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
