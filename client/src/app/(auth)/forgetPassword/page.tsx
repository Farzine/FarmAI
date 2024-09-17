"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/user/forgot-password`,
        { email }
      );
      setMessage("OTP sent to your email.");
      // Store email in localStorage to pass to reset password page
      localStorage.setItem("email", email);
      router.push("/resetPassword");
    } catch (error) {
      setMessage("Error sending OTP. Please try again.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.back()}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </div>
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <p className="text-center text-gray-500">Enter your email to receive an OTP.</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded-md"
        />
        <button
          onClick={handleForgotPassword}
          className="w-full bg-black text-white py-2 rounded-md"
        >
          Send OTP
        </button>
        {message && <p className="text-center text-red-500">{message}</p>}
      </div>
    </section>
  );
}
