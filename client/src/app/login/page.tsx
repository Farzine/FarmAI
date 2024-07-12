"use client"

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import { RiMailLine, RiLockPasswordLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Logged in successfully');
        // Redirect to the dashboard or another page
        router.push('/dashboard');
      } else {
        console.error('Failed to log in');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div>
        <h2 className="text-4xl font-bold text-center mb-8 mt-20 mr-8">Login</h2>
      </div>
      <div className=' flex items-center justify-center mb-2'>
        <form onSubmit={handleSubmit} className="space-y-6 w-1/2">
          <div>
            <div className="mt-1 relative rounded-md shadow-sm border-2 mr-20 ml-20 border-black">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiMailLine className="h-5 w-5 text-black" />
              </div>
              <input
                type="email"
                id="email"
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <div className="mt-1 relative rounded-md shadow-sm border-2 mr-20 ml-20 border-black">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiLockPasswordLine className="h-5 w-5 text-black" />
              </div>
              <input
                type="password"
                id="password"
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-60 py-2 px-4 bg-green-700 text-white font-semibold rounded-md shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ml-72"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="text-center mt-4 mb-20">
        <p className="text-gray-700">Don't have an account? <a href="/create-account" className="text-green-700 hover:underline">Create Account</a></p>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
