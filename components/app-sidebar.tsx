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
  PiggyBank,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { NavUser } from "./app-navuser";
import { useAuth } from "@/context/hooks/authHooks";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
  const { user } = useAuth();
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
            title: "Budgets",
            url: "/budget",
            icon: PiggyBank,
            isActive: pathName === "/budget",
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
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map(({ icon: Icon, title, url, isActive }) => (
                  <SidebarMenuItem key={title} className="p-2 ">
                    <SidebarMenuButton
                      className={`flex items-center gap-2 py-2 px-2 text-lg font-normal transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-md ${
                        isActive
                          ? "bg-[#0B1020] text-white"
                          : "text-gray-400 hover:text-textColor hover:bg-[#1D1A27] hover:translate-x-0.75"
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
