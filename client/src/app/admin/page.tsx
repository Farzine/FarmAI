"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_APP_BACKEND_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("token", data.token);
        router.push("/admin/scientificCultivationMethods");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <div className={`flex flex-col md:flex-row w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden ${isLoading ? 'blur-sm' : ''}`}>
        <div className="relative w-full md:w-1/2 h-48 md:h-auto">
          <Image src="/logo.png" alt="Mural" layout="fill" objectFit="cover" />
        </div>
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <h2 className="text-3xl font-bold mb-8 text-center">ADMIN LOGIN</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="border border-gray-300 p-4 rounded-md">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline flex justify-center items-center"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Log in'}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-xs italic mt-4">{error}</p>
            )}
          </form>
          <div className="flex justify-center mt-8">
            <Image
              src="/logo.png"
              alt="SUST Logo"
              width={120}
              height={120}
              className="h-28 w-auto mx-2"
            />
            <Image
              src="/logo.png"
              alt="ICERIE logo"
              width={120}
              height={120}
              className="h-28 w-auto mx-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
