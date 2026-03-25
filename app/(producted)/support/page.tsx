import React from "react";
import FAQCard from "./_component/faq-card";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-tab/motion-tabs";
import { SunMoon, User2 } from "lucide-react";
import ContactCard from "./_component/contact-card";
import SecondHeader from "@/components/second-header";

const page = () => {
  const tabs = [
    {
      name: "FAQ",
      value: "faq",
      icon: User2,
      content: (
        <div className="flex gap-3">
          <FAQCard />
          <ContactCard />
        </div>
      ),
    },
    {
      name: "Resources",
      value: "resources",
      icon: SunMoon,
      content: <>{/* <ThemeCard /> */}</>,
    },
  ];

  return (
    <div>
      <SecondHeader currentPage="Support">
        <></>
      </SecondHeader>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="bg-card h-fit w-full rounded-sm flex gap-2">
          {tabs.map(({ icon: Icon, name, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="px-6 py-2 rounded-xl font-medium text-textColor transition-all data-[state=active]:text-textColor data-[state=active]:bg-linear-to-r data-[state=active]:from-primary data-[state=active]:to-primary data-[state=active]:shadow-[0_0_0_2px_rgba(255,255,255,0.6),0_0_12px_rgba(168,85,247,0.7)]border-none text-sm ">
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

export default page;
