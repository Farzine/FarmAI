"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OtpVerification from "@/components/inputOTP";

export default function Otp() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || ''; // Get email from the query parameters
    // If email is not present in the URL, redirect to SignUp page
    useEffect(() => {
        if (!email) {
            router.push("/signUp");
        }
    }, [email, router]);
    return (
        <div>
            <div>
            {email && <OtpVerification email={email} />} {/* Pass email to OTP component */}
            </div>
        </div>
    );
}
