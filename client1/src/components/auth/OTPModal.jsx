import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { verifyOTP } from "@/store/auth-slice";
import { useToast } from "@/components/ui/use-toast";

const OTPModal = ({ email, onSuccess, onFailure }) => {
    console.log("Email passed to OTPModal:", email);
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isVerifying, setIsVerifying] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      toast({
        title: "OTP expired. Please try again.",
        variant: "destructive",
      });
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  function handleOTPSubmit(event) {
    event.preventDefault();
    setIsVerifying(true);

    console.log("Submitting OTP with email:", { email, otp });

    dispatch(verifyOTP({ email, otp })).then((data) => {
        setIsVerifying(false);

      if (data?.payload?.success) {
        toast({
          title: "OTP verified successfully!",
        });
        onSuccess();
      } else {
        toast({
          title: data?.payload?.message || "OTP verification failed.",
          variant: "destructive",
        });
        onFailure();
      }
    }).catch((error) => {
        setIsVerifying(false);
        console.error("Error verifying OTP:", error);
        toast({
          title: "Error verifying OTP.",
          variant: "destructive",
        });
        onFailure();
      });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md space-y-4 relative">
      <h2 className="text-xl font-bold text-gray-800">Email Verification</h2>
      <p className="text-gray-600">
        Please enter the OTP sent to: <strong>{email}</strong>
      </p>
      <form onSubmit={handleOTPSubmit} className="space-y-4">
        <Input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full"
        />
        <div className="text-sm text-gray-500">
          Time left: <strong>{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</strong>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
          disabled={isVerifying}
        >
          {isVerifying ? "Verifying..." : "Verify OTP"}
        </Button>
      </form>
    </div>
  </div>
);
};

export default OTPModal;
