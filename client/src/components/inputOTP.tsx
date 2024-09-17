import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

const OtpVerification: React.FC<{ email: string }> = ({ email }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [counter, setCounter] = useState(600); 
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value !== '') {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/user/verify-otp`, {
        email,
        otp: otpCode,
      });

      if (response.data.success) {
        console.log(response.data);
        router.push('/');
      } else {
        setMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setMessage('Error verifying OTP. Please try again later.');
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/resend-otp`, { email });
      setMessage('OTP resent successfully.');
      setCounter(600);
    } catch (error) {
      setMessage('Error resending OTP.');
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        {/* Back Button */}
        <button onClick={() => router.back()} className="mb-4 flex items-center text-black">
          <ArrowLeft size={24} /> {/* Back arrow */}
          <span className="ml-2">Back</span>
        </button>

        <h2 className="text-xl font-bold text-center mb-4">Verify Your Account</h2>
        <p className="text-center mb-6">
          We sent a verification code to <strong>{email}</strong>. <br />
          Please check your email and paste the code below.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                className="w-12 h-12 border border-gray-300 rounded text-center text-lg focus:outline-none"
              />
            ))}
          </div>

          {message && <p className="text-red-500 text-sm mt-2">{message}</p>}

          <button
            type="submit"
            className="mt-4 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-200"
          >
            VERIFY
          </button>
        </form>

        <div className="text-center mt-4">
          {counter > 0 ? (
            <p className="text-gray-500">Resend code in {formatTime(counter)}</p>
          ) : (
            <button onClick={handleResendOtp} className="text-blue-500 hover:underline mt-2">
              Resend
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
