"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Get the email from localStorage
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      router.push("/forgetPassword"); // Redirect if no email found
    }
  }, []);

  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/user/reset-password`, {
        email,
        otp,
        newPassword,
        confirmNewPassword,
      });
      setMessage("Password reset successful.");
      router.push("/");
    } catch (error) {
      setMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.back()}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </div>
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <p className="text-center text-gray-500">Enter OTP and new password to reset your password.</p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="OTP"
          className="w-full p-3 border rounded-md"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="w-full p-3 border rounded-md"
        />
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="Confirm New Password"
          className="w-full p-3 border rounded-md"
        />
        <button
          onClick={handleResetPassword}
          className="w-full bg-black text-white py-2 rounded-md"
        >
          Reset Password
        </button>
        {message && <p className="text-center text-red-500">{message}</p>}
      </div>
    </section>
  );
}
