import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { FaBell, FaImage, FaEnvelope, FaCalendarCheck, FaHandshake } from 'react-icons/fa';
import { FaMessage, FaNoteSticky, FaPeopleGroup } from 'react-icons/fa6';
import { RiListCheck, RiTimerLine } from "react-icons/ri";
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [loggingOut, setLoggingOut] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async () => {
        try {
            setLoggingOut(true);
            const token = Cookies.get('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/admin/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });

            if (response.ok) {
                router.push('/admin');
                console.log('Logged out successfully');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setLoggingOut(false);
        }
    };

    const handleNavigation = (path: string) => {
        router.push(path);
        setIsSidebarOpen(false); // Close sidebar on mobile after navigation
    };

    const getActiveClass = (path: string) => {
        return pathname === path ? 'bg-[#EAEFEF] text-black pt-2 pb-2' : '';
    };

    return (
        <>
            {/* Mobile menu button */}
            <div className="md:hidden p-4">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-2xl"
                >
                    {isSidebarOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed h-full bg-[#a8c1c1] w-64 py-8 px-4 flex flex-col items-center transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative z-50 overflow-y-auto h-screen`}
                style={{ backgroundColor: '#a8c1c1' }}
            >
                <div className="text-2xl font-bold mb-8">Hello, Admin</div>
                <div className="flex flex-col space-y-1 w-full">
                    <div
                        onClick={() => handleNavigation('/admin/scientificCultivationMethods')}
                        className={`flex items-center space-x-3 cursor-pointer hover:text-green-600 p-5 rounded ${getActiveClass('/admin/notices')}`}
                    >
                        <FaBell className="h-6 w-6" />
                        <span>Scientific Cultivations</span>
                    </div>
                    <div
                        onClick={() => handleNavigation('/admin/messages')}
                        className={`flex items-center space-x-3 cursor-pointer hover:text-green-600 p-5 rounded ${getActiveClass('/admin/messages')}`}
                    >
                        <FaMessage className="h-6 w-6" />
                        <span>Chair Message</span>
                    </div>
                    <div
                        onClick={() => handleNavigation('/admin/uploadImage')}
                        className={`flex items-center space-x-3 cursor-pointer hover:text-green-600 p-5 rounded ${getActiveClass('/admin/uploadImage')}`}
                    >
                        <FaImage className="h-6 w-6" />
                        <span>Image</span>
                    </div>
                    <div
                        onClick={() => handleNavigation('/admin/sponsor')}
                        className={`flex items-center space-x-3 cursor-pointer hover:text-green-600 p-5 rounded ${getActiveClass('/admin/sponsor')}`}
                    >
                        <FaHandshake className="h-6 w-6" />
                        <span>Sponsors</span>
                    </div>
                    <div
                        onClick={() => handleNavigation('/admin/importantDates')}
                        className={`flex items-center space-x-3 cursor-pointer hover:text-green-600 p-5 rounded ${getActiveClass('/admin/importantDates')}`}
                    >
                        <FaCalendarCheck className="h-6 w-6" />
                        <span>Important Dates</span>
                    </div>
                    <div
                        onClick={() => handleNavigation('/admin/importantUpdate')}
                        className={`flex items-center space-x-3 cursor-pointer hover:text-green-600 p-5 rounded ${getActiveClass('/admin/importantUpdate')}`}
                    >
                        <FaNoteSticky className="h-6 w-6" />
                        <span>Important Update</span>
                    </div>
                    <div
                        onClick={() => handleNavigation('/admin/schedule')}
                        className={`flex items-center space-x-3 cursor-pointer hover:text-green-600 p-5 rounded ${getActiveClass('/admin/schedule')}`}
                    >
                        <RiTimerLine className="h-6 w-6" />
                        <span>Schedule</span>
                    </div>
                    <div
                        onClick={() => handleNavigation('/admin/sessionList')}
                        className={`flex items-center space-x-3 cursor-pointer hover:text-green-600 p-5 rounded ${getActiveClass('/admin/sessionList')}`}
                    >
                        <RiListCheck className="h-6 w-6" />
                        <span>Session List</span>
                    </div>
                    <div
                        onClick={() => handleNavigation('/admin/attendeeList')}
                        className={`flex items-center space-x-3 cursor-pointer hover:text-green-600 p-5 rounded ${getActiveClass('/admin/attendeeList')}`}
                    >
                        <FaPeopleGroup className="h-6 w-6" />
                        <span>Attendee List</span>
                    </div>
                    <div
                        onClick={() => handleNavigation('/admin/updateEmailPassword')}
                        className={`flex items-center space-x-3 cursor-pointer hover:text-green-600 p-5 rounded ${getActiveClass('/admin/updateEmailPassword')}`}
                    >
                        <FaEnvelope className="h-6 w-6" />
                        <span>Change Email and Password</span>
                    </div>
                </div>
                {loggingOut ? (
                    <div className="mt-5 flex items-center space-x-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                        <span className="text-black">Logging out...</span>
                    </div>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="mt-5 py-2 px-4 border border-green-600 text-black rounded hover:bg-green-600 hover:text-white"
                    >
                        Log Out
                    </button>
                )}
            </div>

            {/* Overlay for mobile view */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
