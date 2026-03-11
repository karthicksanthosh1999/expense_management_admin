import React from "react";
import FAQCard from "./_component/faq-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = () => {
  return (
    <div>
      <Tabs defaultValue="faq" className="w-100">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
      </Tabs>

      <FAQCard />
    </div>
  );
};

export default page;
