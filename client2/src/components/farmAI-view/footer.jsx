import React from "react";
import {Link} from "react-router-dom"; 
import { FaTwitter, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa"; 

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Newsletter Subscription */}
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="text-sm md:text-lg font-semibold mb-4 text-center font-serif">
            Subscribe to our newsletter
          </h2>
          <form className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-800 px-2 py-2 rounded-lg">
              <span className="mr-2 text-gray-400">📧</span>
              <input
                type="email"
                placeholder="Input your email"
                className="bg-transparent border-none text-white placeholder-gray-400 focus:outline-none text-sm md:text-md"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 px-6 py-2 rounded-lg text-white hover:bg-green-700 transition-colors text-sm md:text-md"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo */}
          <div className="flex items-center justify-center md:justify-start">
            <img src="/FarmAI.png" alt="FarmAI Logo" className="h-16 w-16 md:mr-2 mr-16" />
            <span className="absolute mt-5 md:ml-10 ml-8 font-semibold font-serif text-lg">FarmAI</span>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center md:space-x-4 space-x-3 md:text-md text-sm">
            <Link href="#" className="hover:text-gray-400 whitespace-nowrap">
              About us
            </Link>
            <Link href="#" className="hover:text-gray-400 whitespace-nowrap">
              Features
            </Link>
            <Link href="#" className="hover:text-gray-400 whitespace-nowrap">
              Help Center
            </Link>
            <Link href="#" className="hover:text-gray-400 whitespace-nowrap">
              Contact us
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center md:justify-end space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-700">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600">
              <FaLinkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-600">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between border-t border-gray-700 pt-6">
          <div className="text-sm text-gray-400 text-center">
            © 2024 FarmAI, Inc. • Privacy • Terms • Sitemap
          </div>
          {/* Language Selector */}
          <div className="relative inline-block mt-4 md:mt-0">
            <select
              className="bg-gray-800 text-white text-sm rounded-lg p-2 focus:outline-none cursor-pointer"
              defaultValue="English"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
