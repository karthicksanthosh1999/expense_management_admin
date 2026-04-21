import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-tab/motion-tabs";
import GoalCard from "./goal-card";

const tabs = [
  {
    name: "All",
    value: "all",
    content: (
      <>
        <GoalCard />
      </>
    ),
  },
  {
    name: "Favorites",
    value: "favorites",
    content: (
      <>
        All your{" "}
        <span className="text-foreground font-semibold">favorites</span> are
        saved here. Revisit articles, collections, and moments you love, any
        time you want a little inspiration.
      </>
    ),
  },
  {
    name: "Surprise Me",
    value: "surprise",
    content: (
      <>
        <span className="text-foreground font-semibold">Surprise!</span>{" "}
        Here&apos;s something unexpected—a fun fact, a quirky tip, or a daily
        challenge. Come back for a new surprise every day!
      </>
    ),
  },
];

const GoalTabs = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-[#0b1020] p-2 rounded-2xl flex gap-2">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-6 py-2 rounded-xl font-medium text-gray-400 transition-all data-[state=active]:text-white data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:shadow-[0_0_0_2px_rgba(255,255,255,0.6),0_0_12px_rgba(168,85,247,0.7)]border-none p-5 text-lg">
              {tab.name}
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

export default GoalTabs;
