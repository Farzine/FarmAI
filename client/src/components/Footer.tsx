import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

    const handleSubscribe = () => {
        alert(`Subscribed with email: ${email}`);
        setEmail('');
    };

    const toggleLanguageMenu = () => {
        setLanguageMenuOpen(!languageMenuOpen);
    };

    return (
        <footer className="bg-gray-900 text-white p-6 flex flex-col items-center space-y-4 md:space-y-0 md:px-20 md:py-10">
            {/* Top Section */}

            <div className="flex items-center space-x-4 p-4">
                {/* Subscribe Section */}
                
                    <span className="text-lg font-semibold mb-2 md:mb-0">Subscribe to our newsletter</span>

            </div>

            <div className="flex items-center space-x-4">
                <input
                    type="email"
                    className="p-2 text-black rounded w-64 focus:outline-none"
                    placeholder="Input your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
                    onClick={handleSubscribe}
                >
                    Subscribe
                </button>
            </div>



            {/* Middle Section */}
            <div className="w-full flex justify-center space-x-4 text-center py-4">
                {/* Logo and Project Name */}
                <div className="flex items-center space-x-4">
                    <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="cursor-pointer"
          />
                    <span className="text-xl font-semibold">FarmAI</span>
                </div>
                <div className='flex items-center space-x-4'>
                    <a href="/pricing" className="hover:underline">Pricing</a>
                    <a href="/about-us" className="hover:underline">About us</a>
                    <a href="/features" className="hover:underline">Features</a>
                    <a href="/help-center" className="hover:underline">Help Center</a>
                    <a href="/contact-us" className="hover:underline">Contact us</a>
                    <a href="/faqs" className="hover:underline">FAQs</a>
                    <a href="/careers" className="hover:underline">Careers</a>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="w-full flex justify-between items-center">

                {/* Language Selector */}
                <div className="relative">
                    <button
                        className="bg-gray-700 p-2 rounded hover:bg-gray-600"
                        onClick={toggleLanguageMenu}
                    >
                        English
                    </button>
                    {languageMenuOpen && (
                        <div className="relative right-0 bg-gray-800 mt-2 p-2 rounded shadow-lg">
                            <a href="/en" className="block px-4 py-2 hover:bg-gray-700">English</a>
                            <a href="/es" className="block px-4 py-2 hover:bg-gray-700">Bangla</a>
                            <a href="/fr" className="block px-4 py-2 hover:bg-gray-700">Français</a>
                            <a href="/de" className="block px-4 py-2 hover:bg-gray-700">China</a>
                        </div>
                    )}
                </div>

                {/* Footer Links */}
                <div className="text-gray-500">
                    © 2024 FarmAI, Inc. • <a href="/privacy" className="hover:underline">Privacy</a> • <a href="/terms" className="hover:underline">Terms</a> • <a href="/sitemap" className="hover:underline">Sitemap</a>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-4">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FaTwitter />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                        <FaFacebook />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                        <FaLinkedin />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
                        <FaYoutube />
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;