import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { KeyIcon, UserIcon, VerifiedIcon } from '@/lib/icon-center';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from '@/context/hooks/authHooks';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import OTPForm from '@/components/otp-form';
import { useState } from 'react';
import { sendOTPApi } from '../_hooks/settingHooks';
import { Verified, X } from 'lucide-react';

const SecurityCard = () => {

    const { user, loading } = useAuth();
    const [otpFormOpen, setOTPFormOpen] = useState(false);
    const [otpLoading,setOtpLoading] = useState(false)
    
    const handleOtpFormOpen = async() => {
        try {
            await sendOTPApi(user?.email as string)
            setOTPFormOpen(true)
        } catch (error) {
            console.log(error)
        }finally{
            setOtpLoading(false)
        }
    }

    return (
        <>
        <Card>
            <CardContent>
                <CardHeader className='text-2xl font-semibold'>Security Settings</CardHeader>
                    <Accordion>
                        {/* PASSWORD RESET  */}
                        <div className="mt-5">
                            <div className="flex items-center justify-between border border-blue-900 hover:border-primary cursor-pointer rounded-xl transaction ease-in-out duration-500 hover:translate-y-1 p-3">
                            <AccordionItem className={'w-full'}>
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-3">
                                            <KeyIcon size={30} category="key" />
                                            <h1 className="text-lg">Reset Password</h1>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Button className='text-white' onClick={handleOtpFormOpen}>Send OTP</Button>
                                    </AccordionContent>
                                </AccordionItem>
                            </div>
                        </div>

                        {/* USER DB FORMAT  */}
                        <div className="mt-5">
                            <div className="flex items-center justify-between border border-blue-900 hover:border-primary cursor-pointer rounded-xl transaction ease-in-out duration-500 hover:translate-y-1 p-3">
                                   <AccordionItem className={'w-full'}>
                                        <AccordionTrigger>
                                        <div className="flex items-center gap-3">
                                            <UserIcon size={30} category="user" />
                                            <h1 className="text-lg">User Data DB Format</h1>
                                        </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {
                                                loading ? (
                                                    <div className="space-y-2">
                                                        <Skeleton className="h-5 "/>
                                                        <Skeleton className="h-5 w-lg"/>
                                                        <Skeleton className="h-5 "/>
                                                        <Skeleton className="h-5 w-lg"/>
                                                    </div>
                                                ) : (
                                                <pre>
                                                    {JSON.stringify(user, null, 2)}
                                                </pre>
                                                )
                                            }
                                        </AccordionContent>
                                    </AccordionItem>
                            </div>
                        </div>

                        {/* VERIFIED USER */}
                        <div className="mt-5">
                            <div className="flex items-center justify-between border border-blue-900 hover:border-primary rounded-xl transaction ease-in-out duration-500 hover:translate-y-1 p-3">
                                <AccordionItem className={'w-full'}>
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-3">
                                            <VerifiedIcon size={30} category="key" />
                                            <h1 className="text-lg">Verify Email</h1>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='flex items-center'>
                                        <h1 className="text-lg font-semibold pr-2">{user?.email}</h1>
                                        {
                                            user?.verifiedEmail ? (
                                        <Button className='text-white h-auto w-auto p-1' type='button' size={'icon'}>
                                            <Verified className='size-5' />
                                        </Button>
                                            ) : (
                                        <Button className='text-white h-auto w-auto p-1' type='button' size={'icon'} onClick={handleOtpFormOpen}>
                                            <X className='size-5' />
                                        </Button>
                                            )
                                        }
                                    </AccordionContent>
                                </AccordionItem>
                            </div>
                        </div>
                    </Accordion>
            </CardContent>
        </Card>
        <OTPForm
            close={setOTPFormOpen}
            open={otpFormOpen}
            otpLoading={otpLoading}
        />
        </>
    )
}

export default SecurityCard
