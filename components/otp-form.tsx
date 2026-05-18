import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useUpdateUserHook } from "@/app/(auth)/verification-page/_hooks/verificationHook";

interface IProps {
  open: boolean;
  close: (open: boolean) => void;
}

const OTPForm = ({ close, open }: IProps) => {
  const { mutate, isPending } = useUpdateUserHook();
  const handleSubmit = () => {
    console.log("Submitted");
  };
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className={"w-full"}>
        <DialogHeader className="font-semibold text-xl">
          Enter Your OTP Number
        </DialogHeader>
        <Separator />
        <form className="space-y-5" onClick={handleSubmit}>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="flex items-center justify-center w-full">
            <Button type="submit" className="text-white w-full">
              Submit
            </Button>
            <Button
              type="reset"
              className="text-white w-full"
              onClick={() => close(false)}>
              Close
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OTPForm;
