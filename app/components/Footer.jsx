import React from 'react';

const Footer = () => {
  return (
    <div className="flex flex-col">
      {/* Main Content */}
      <div className="flex-grow"></div>

      {/* Footer */}
      <footer className="bg-[#1f7259] text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left Section */}
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold ">Blog Post</h2>
              <p className="text-sm  mt-2">
                Your daily source of amazing articles and news.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <a href="#" className=" hover:text-white transition">
                About Us
              </a>
              <a href="#" className=" hover:text-white transition">
                Contact
              </a>
              <a href="#" className=" hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className=" hover:text-white transition">
                Terms of Service
              </a>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-700 pt-6 text-center text-sm ">
            © {new Date().getFullYear()} Block Post. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
