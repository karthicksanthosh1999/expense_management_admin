import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { KeyIcon, UserIcon } from '@/lib/icon-center';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getUserFromToken } from '@/lib/getUser';
import { useAuth } from '@/context/hooks/authHooks';
import { Skeleton } from '@/components/ui/skeleton';

const SecurityCard = () => {
    const { user, loading } = useAuth();



    return (
        <Card>
            <CardContent>
                <CardHeader className='text-2xl font-semibold'>Security Settings</CardHeader>
                          <Accordion>
                {/* PASSWORD RESET  */}
                <div className="mt-5">
                    <div className="flex items-center justify-between border border-blue-900 hover:border-primary cursor-pointer rounded-xl transaction ease-in-out duration-500 hover:translate-y-1 p-3">
                        <AccordionItem>
                            <AccordionTrigger>
                                <div className="flex items-center gap-3">
                                    <KeyIcon size={30} category="key" />
                                    <h1 className="text-lg">Reset Password</h1>
                                </div>
                            </AccordionTrigger>
                                     <AccordionContent></AccordionContent>
                        </AccordionItem>
                    </div>
                </div>

                {/* USER DB FORMAT  */}
                <div className="mt-5">
                    <div className="flex items-center justify-between border border-blue-900 hover:border-primary cursor-pointer rounded-xl transaction ease-in-out duration-500 hover:translate-y-1 p-3">
                            <AccordionItem>
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
                        </Accordion>
            </CardContent>
        </Card>
    )
}

export default SecurityCard
