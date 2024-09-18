"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SignUp() {
    const router = useRouter();
    interface FormData {
        name: string;
        email: string;
        phone: string;
        address: string;
        password: string;
        profilePicture: File | null;
    }

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        profilePicture: null,
    });

    const [message, setMessage] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value, files } = e.target;
        if (name === "profilePicture") {
            setFormData({ ...formData, profilePicture: files ? files[0] : null });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Create form data to send profile picture
        const form = new FormData();
        form.append("name", formData.name);
        form.append("email", formData.email);
        form.append("phone", formData.phone);
        form.append("address", formData.address);
        form.append("password", formData.password);

        if (formData.profilePicture) {
            form.append("profilePicture", formData.profilePicture);
        }

        try {
            // Send request to the backend
            await axios.post(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/user/register`, form, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            router.push(`/otp?email=${formData.email}`); // Navigate to OTP verification page after registration
        } catch (error) {
            if ((error as any).response && (error as any).response.status === 400) {
                setMessage("Email already exists.");
            } else {
                console.error("Error during sign-up:", error);
                setMessage("Error during registration.");
            }
        }
    };

    const handleGoogleSignUp = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/user/auth/google`;
    };

    return (
        <div>
            <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <section>
                <div className="h-screen flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 bg-white">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <div className="mb-2 flex justify-center"></div>
                        <h2 className="text-center text-2xl font-bold leading-tight text-black">
                            Sign up to create an account
                        </h2>
                        <p className="mt-2 text-center text-base text-gray-600">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-medium text-black transition-all duration-200 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                        <form onSubmit={handleSubmit} className="mt-8" encType="multipart/form-data">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                                        Full Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Full Name"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                                        Email Address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="text-base font-medium text-gray-900">
                                        Phone Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Phone Number"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="address" className="text-base font-medium text-gray-900">
                                        Address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Address"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="text-base font-medium text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="profilePicture" className="text-base font-medium text-gray-900">
                                        Profile Picture
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="file"
                                            id="profilePicture"
                                            name="profilePicture"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Create Account <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                            <div>{message && <p className="text-red-500">{message}</p>}</div>
                        </form>
                        <div className="mt-3 space-y-3">
                            <button
                                type="button"
                                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                                onClick={handleGoogleSignUp}
                            >
                                <span className="mr-2 inline-block">
                                    <Image src="/google.png" alt="Google" width={20} height={20} />
                                </span>
                                Sign up with Google
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
