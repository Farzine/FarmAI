"use client"

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import { RiMailLine, RiUserLine, RiLockPasswordLine } from 'react-icons/ri';

const CreateAccount: React.FC = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      fullName,
      password,
      confirmPassword,
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Account created successfully');
      } else {
        console.error('Failed to create account');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
        <Navbar />
        <div>
        <h2 className="text-4xl font-bold text-center mb-8 mt-20">Create your account</h2>
        </div>
        <div className=' flex items-center justify-center mb-20'>
        <form onSubmit={handleSubmit} className="space-y-6 w-1/2 ">
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
                <RiUserLine className="h-5 w-5 text-black" />
              </div>
              <input
                type="text"
                id="fullName"
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
            <div className="mt-1 relative rounded-md shadow-sm border-2 mr-20 ml-20 border-black">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiLockPasswordLine className="h-5 w-5 text-black" />
              </div>
              <input
                type="password"
                id="confirmPassword"
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-60 py-2 px-4 bg-green-700 text-white font-semibold rounded-md shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ml-72"
            >
              Create an account
            </button>
          </div>
        </form>
        </div>
        <Footer />
    </div>
  );
};

export default CreateAccount;
