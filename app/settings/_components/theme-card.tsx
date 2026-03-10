'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import bulbIcon from "@/sources/icons/light.png"
import computerIcon from "@/sources/icons/laptop.png"
import moonIcon from "@/sources/icons/moon.png"
import Image from 'next/image';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from '@/components/ui/field';


const ThemeCard = () => {

    const { theme, setTheme } = useTheme();
    const handleTheme = (theme: string) => {
        setTheme(theme)
        toast(`${theme} theme applied successfully`, {

        })
    }
    return (
        <Card className='max-w-[50%] w-full'>
            <CardContent>
                <CardHeader className='text-textColor text-lg font-semibold'>Theme</CardHeader>
                <RadioGroup defaultValue={theme} className="max-w-full space-y-2">
                    <FieldLabel htmlFor="light-plan">
                        <Field orientation="horizontal">
                            <FieldContent>
                                <div className='flex items-start gap-5'>
                                    <div className="flex items-center gap-5">
                                        <RadioGroupItem value="light" id="light-plan" />
                                        <Image src={bulbIcon} alt='icon' width={50} height={50} />
                                    </div>
                                    <div>
                                        <FieldTitle>Light Mode</FieldTitle>
                                        <FieldDescription>
                                            Clean and bright interface
                                        </FieldDescription>
                                    </div>
                                </div>
                            </FieldContent>
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="dark-plan">
                        <Field orientation="horizontal">
                            <div className='flex items-start gap-5'>
                                <div className="flex items-center gap-5">
                                    <RadioGroupItem value="dark" id="dark-plan" />
                                    <Image src={moonIcon} alt='icon' width={50} height={50} />
                                </div>
                                <div>
                                    <FieldTitle>Dark Mode</FieldTitle>
                                    <FieldDescription>
                                        Clean and bright interface
                                    </FieldDescription>
                                </div>
                            </div>
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="system-plan" className='border border-highlight'>
                        <Field orientation="horizontal">
                            <FieldContent>
                                <div className='flex items-start gap-5'>
                                    <div className="flex items-center gap-5">
                                        <RadioGroupItem value="system" id="system-plan" />
                                        <Image src={computerIcon} alt='icon' width={50} height={50} />
                                    </div>
                                    <div>
                                        <FieldTitle>System Mode</FieldTitle>
                                        <FieldDescription>
                                            Follow system preferences
                                        </FieldDescription>
                                    </div>
                                </div>
                            </FieldContent>
                        </Field>
                    </FieldLabel>
                </RadioGroup>


            </CardContent>
        </Card>
    )
}
export default ThemeCard
