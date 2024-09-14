"use client";
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const EmailPage = () => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token = Cookies.get('token');
  if (!token) router.push('/admin');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/admin/update-email-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ newEmail, newPassword }),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000); 
        setNewEmail('');
        setNewPassword('');
      } else {
        setError(data.message || 'Update failed');
        setTimeout(() => setError(null), 3000); 
      }
    } catch (error) {
      console.error('Error updating email and password:', error);
      setError('Failed to update. Please try again.');
      setTimeout(() => setError(null), 3000); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            )}
      <div className={`flex-1 p-4 md:p-8 overflow-y-auto bg-gray-100 h-screen ${loading ? 'filter blur-sm' : ''}`}>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full md:w-1/3">
          <input
            type="email"
            placeholder="New Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full md:w-20">Save</button>
        </form>

        {/* Success message display */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Email and password updated successfully.</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={() => setSuccess(false)}>
              <svg className="fill-current h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M14.354 5.354a1 1 0 011.414 1.414L11.414 10l4.354 4.354a1 1 0 11-1.414 1.414L10 11.414l-4.354 4.354a1 1 0 11-1.414-1.414L8.586 10 4.232 5.646a1 1 0 111.414-1.414L10 8.586l4.354-4.354z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        )}

        {/* Error message display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={() => setError(null)}>
              <svg className="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M14.354 5.354a1 1 0 011.414 1.414L11.414 10l4.354 4.354a1 1 0 11-1.414 1.414L10 11.414l-4.354 4.354a1 1 0 11-1.414-1.414L8.586 10 4.232 5.646a1 1 0 111.414-1.414L10 8.586l4.354-4.354z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailPage;
