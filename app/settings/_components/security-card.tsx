import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { KeyIcon } from '@/lib/icon-center'

const SecurityCard = () => {
    return (
        <Card>
            <CardContent>
                <CardHeader className='text-2xl font-semibold'>Security Settings</CardHeader>
                <div className="mt-5">
                    <div className="flex items-center justify-between border border-blue-900 hover:border-primary cursor-pointer rounded-xl transaction ease-in-out duration-500 hover:translate-y-1 p-3">
                        <KeyIcon size={30} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SecurityCard
