"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { laptopIcon, moonIcon, sunIcon } from "@/lib/icon-center";

const ThemeCard = () => {
  const { theme, setTheme } = useTheme();
  const handleTheme = (theme: string) => {
    setTheme(theme);
    toast.success(`${theme} theme applied successfully`);
  };

  const themeData = [
    {
      id: "0",
      htmlId: "light-plan",
      icon: moonIcon,
      title: "Dark Mode",
      description: " Clean and bright interface",
      key: "dark",
    },
    {
      id: "1",
      htmlId: "light-plan",
      description: "Clean and bright interface",
      icon: sunIcon,
      title: "Light",
      key: "light",
    },
    {
      id: "2",
      htmlId: "system-plan",
      description: "Follow system preferences",
      icon: laptopIcon,
      title: "System",
      key: "system",
    },
  ];

  return (
    <Card className="lg:w-[50%] w-full">
      <CardContent>
        <CardHeader className="text-textColor text-lg font-semibold">
          Theme
        </CardHeader>
        <RadioGroup defaultValue={theme} className="max-w-full space-y-2">
          {themeData.map(
            ({ htmlId, icon: Icon, id, title, description, key }) => (
              <FieldLabel
                htmlFor={htmlId}
                key={id}
                onClick={() => handleTheme(key)}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <div className="flex items-start gap-5">
                      <div className="flex items-center gap-5">
                        <RadioGroupItem value={key} id={htmlId} />
                        <Icon category={title} />
                      </div>
                      <div>
                        <FieldTitle>{title}</FieldTitle>
                        <FieldDescription>{description}</FieldDescription>
                      </div>
                    </div>
                  </FieldContent>
                </Field>
              </FieldLabel>
            ),
          )}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
export default ThemeCard;
