import { Card, CardContent } from "@/components/ui/card";
import { emailIcon, phoneIcon, timerIcon } from "@/lib/icon-center";

const ContactCard = () => {
  const contactInfo = [
    {
      id: "0",
      icon: emailIcon,
      title: "Email",
      description: "jk@jk.com",
    },
    {
      id: "1",
      icon: phoneIcon,
      title: "Phone",
      description: "8220942384",
    },
    {
      id: "2",
      icon: timerIcon,
      title: "Hours",
      description: "24/7",
    },
  ];

  return (
    <Card className="max-w-[30%] w-full h-fit">
      <CardContent>
        <h1 className="text-textColor text-xl font-semibold">
          Contact Information
        </h1>
        {contactInfo.map(({ description, icon: Icon, id, title }) => (
          <div key={id} className="flex items-center justify-start gap-3 mt-2">
            <div>
              <Icon />
            </div>
            <div className="space-y-1 p-1">
              <h4 className="text-textColor text-[16px] font-normal">
                {title}
              </h4>
              <h4 className="text-textColor text-[16px] font-normal">
                {description}
              </h4>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ContactCard;
