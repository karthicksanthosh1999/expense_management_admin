"use client";

import * as React from "react";

import { SearchForm } from "@/components/search-form";
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
  LayoutDashboard,
  Settings,
  Target,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { NavUser } from "./app-navuser";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
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
            title: "Galas",
            url: "/goal",
            icon: Target,
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
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
