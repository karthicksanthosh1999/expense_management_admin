"use client";

import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-tab/motion-tabs";
import { SunMoon, User2 } from "lucide-react";
import ThemeCard from "./theme-card";

const tabs = [
  {
    name: "Profile",
    value: "profile",
    icon: User2,
    content: <></>,
  },
  {
    name: "Appearance",
    value: "appearance",
    icon: SunMoon,
    content: (
      <>
        <ThemeCard />
      </>
    ),
  },
];

const SettingTabs = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-[#0b1020] h-fit w-fit rounded-2xl flex gap-2">
          {tabs.map(({ icon: Icon, name, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="px-6 py-2 rounded-xl font-medium text-gray-400 transition-all data-[state=active]:text-white data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:shadow-[0_0_0_2px_rgba(255,255,255,0.6),0_0_12px_rgba(168,85,247,0.7)]border-none text-sm ">
              {Icon && <Icon size={18} className="" />}
              {name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContents className="bg-background mt-6 h-full rounded-sm">
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <p className="text-muted-foreground text-sm">{tab.content}</p>
            </TabsContent>
          ))}
        </TabsContents>
      </Tabs>
    </div>
  );
};

export default SettingTabs;
