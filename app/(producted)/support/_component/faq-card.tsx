"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQData } from "../data";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const FAQCard = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [filteredCategoryList, setFilteredCategoryList] =
    useState<typeof FAQData>(FAQData);

  const buttonList = [
    {
      id: "1",
      title: "All",
      isActive: false,
    },
    {
      id: "2",
      title: "General",
      isActive: false,
    },
    {
      id: "3",
      title: "Billing",
      isActive: false,
    },
    {
      id: "4",
      title: "Technical",
      isActive: false,
    },
    {
      id: "5",
      title: "Account",
      isActive: false,
    },
  ];

  const handleFilterData = (categoryType: string) => {
    setActiveTab(categoryType);

    const filteredCategory = FAQData.filter(
      (item) => item.category === categoryType,
    );

    setFilteredCategoryList(
      filteredCategory.length === 0 ? FAQData : filteredCategory,
    );
  };

  return (
    <Card className="w-full border light:border-highlight">
      <CardContent>
        <div className="flex md:flex-row gap-5 flex-col items-center justify-between">
          <h1 className="text-textColor text-xl font-semibold">
            Frequently Asked Questions
          </h1>
          <div className="flex items-center flex-wrap justify-center gap-3 mb-3">
            {buttonList.map(({ id, title }) => (
              <Button
                key={id}
                className={`text-textColor text-sm font-normal py-4 border border-highlight px-4 ${activeTab === title ? "bg-primary text-white" : "bg-transparent"}`}
                onClick={() => {
                  setActiveTab(title);
                  handleFilterData(title);
                }}>
                {title}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Accordion
            className="w-full">
            {filteredCategoryList.map(
              ({ anser, category, icon: Icon, id, question }) => (
                <AccordionItem
                  className={
                    "border hover:border-primary transition duration-300 ease-in-out rounded-lg w-full px-5 my-2 cursor-pointer"
                  }
                  value={id}
                  key={id}>
                  <AccordionTrigger
                    className={
                      "flex items-center justify-center text-[15px] gap-3"
                    }>
                    {Icon && <Icon category={category} />}
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className={"text-gray-400 text-[16px]"}>
                    {anser}
                  </AccordionContent>
                </AccordionItem>
              ),
            )}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

export default FAQCard;
