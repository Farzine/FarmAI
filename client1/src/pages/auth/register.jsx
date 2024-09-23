import OTPModal from "@/components/auth/OTPModal";
import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
  phone: "",
  profilePicture: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [isOTPModalOpen, setOTPModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmailToSend] = useState(""); // Temporary state to store email
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }
    const emailToSend = formDataToSubmit.get("email");

    dispatch(registerUser(formDataToSubmit))
      .then((data) => {
        setIsLoading(false);
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
          });
          console.log(data);
          console.log(emailToSend);
          setEmailToSend(emailToSend );
          setOTPModalOpen(true);
        } else {
          toast({
            title:
              data?.payload?.message ||
              "An error occurred during registration.",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          title: "An error occurred during registration.",
          variant: "destructive",
        });
      });
  }


  const handleOTPSuccess = () => {
    setOTPModalOpen(false);
    navigate("/auth/login");
  };

  const handleOTPFailure = () => {
    toast({
      title: "OTP verification failed, please try again.",
      variant: "destructive",
    });
    setOTPModalOpen(false);
  };
  

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      {console.log("FromData:",formData)}
      <CommonForm
        formControls={registerFormControls}
        buttonText={isLoading ? "Loading..." : "Sign Up"} 
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      {isOTPModalOpen && (
        console.log("OTP email:",email),
        <OTPModal
          email={email}
          onSuccess={handleOTPSuccess}
          onFailure={handleOTPFailure}
        />
      )}
    </div>
  );
}

export default AuthRegister;
