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
import { FormEvent, useState } from "react";
import { useAuth } from "@/context/hooks/authHooks";

interface IProps {
  open: boolean;
  close: (open: boolean) => void;
  otpLoading: boolean
}

const OTPForm = ({ close, open, otpLoading }: IProps) => {

  const { mutate, isPending } = useUpdateUserHook();
  const { user, loading } = useAuth()

  const [otp, setOtp] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutate({otp, email: user?.email as string})
    console.log(otp)
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      {
        otpLoading ? (
          <>
            <p>Loading....</p>
          </>
        ) : (
      <DialogContent className={"w-full"}>
        <DialogHeader className="font-semibold text-xl text-center">
          Enter OTP 
        </DialogHeader>
        <Separator />
          <InputOTP 
            maxLength={6}             
            value={otp}
            onChange={(value) => setOtp(value)}
            >
            <InputOTPGroup>
              <InputOTPSlot className="size-12 text-2xl" index={0} />
              <InputOTPSlot className="size-12 text-2xl" index={1} />
              <InputOTPSlot className="size-12 text-2xl" index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot className="size-12 text-2xl" index={3} />
              <InputOTPSlot className="size-12 text-2xl" index={4} />
              <InputOTPSlot className="size-12 text-2xl" index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="flex items-center justify-center">
              <Button
                type="reset"
                variant='outline'
                className="text-white w-fit text-base"
                onClick={() => close(false)}>
                Close
              </Button>
          </div>
      </DialogContent>
        )
      }

    </Dialog>
  );
};

export default OTPForm;
