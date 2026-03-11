import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQData } from "../data";

const FAQCard = () => {
  return (
    <Card className="max-w-[60%] w-full">
      <CardContent>
        <div>
          <h1 className="text-textColor text-xl font-semibold">
            Frequently Asked Questions
          </h1>
        </div>
        <div>
          <Accordion
            type="single"
            collapsible
            defaultValue={1}
            className="w-full">
            {FAQData.map(({ anser, category, icon: Icon, id, question }) => (
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
                  {Icon && <Icon />}
                  {question}
                </AccordionTrigger>
                <AccordionContent className={"text-gray-400 text-[16px]"}>
                  {anser}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

export default FAQCard;
