import Image from "next/image"; // Importing Next.js optimized Image component
import { useState } from "react"; // Importing useState for state management

const Navbar = () => {
  const [activeLink, setActiveLink] = useState<string>("");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-2xl">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex-shrink-0 flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={64}
            height={64}
            className="cursor-pointer"
          />
          <span className=" mt-2 font-bold text-xl text-green-600">FarmAI</span>
        </div>
        <div className="hidden sm:flex flex-grow justify-center mt-2.5">
          <ul className="flex space-x-4">
            {[
              { name: "Home", href: "/" },
              { name: "About Us", href: "/about" },
              { name: "Services", href: "/services" },
              { name: "AI Diagnosis", href: "/ai-diagnosis" },
              { name: "Contact Us", href: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`relative inline-block group ${
                    activeLink === link.href
                      ? "text-gray-900 py-2 px-4 text-base font-bold underline"
                      : "text-gray-600 py-2 px-4 text-base font-medium hover:text-gray-900 hover:font-bold "
                  }`}
                  onClick={() => handleLinkClick(link.href)}
                >
                  {link.name}
                  <span
                    className={`${
                      activeLink === link.href
                        ? "absolute w-full h-1 bg-green-600 top-7 my-1 left-0"
                        : "absolute w-full h-1 bg-green-600 top-7 my-1 left-0 transition ease-in-out duration-300 transform origin-left scale-x-0 group-hover:scale-x-100"
                    //     ? "absolute w-full h-1 bg-customPurple top-4 my-1 left-0 "
                    //   : "absolute w-full h-1 bg-customPurple top-4 my-1 left-0 transition ease-in-out duration-300 transform origin-left scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="/login"
            className="bg-green-600 text-white px-5 py-2 text-sm rounded-full hover:bg-green-700"
            onClick={() => handleLinkClick("/login")}
          >
            Log in / Register
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;