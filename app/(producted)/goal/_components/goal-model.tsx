import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { IGoalModelTypes } from '../_types/goalTypes';



const GoalModel = ({ formMode, open, setOpen }: IGoalModelTypes) => {
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent>
                <DialogHeader>{formMode === "CREATE" ? "Create" : "Update"} Goal</DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default GoalModel
