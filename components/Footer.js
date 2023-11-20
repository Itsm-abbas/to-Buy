/* eslint-disable @next/next/no-html-link-for-pages */
// Footer.js
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between p-8">
        {/* Column 1: Site Name and Logo */}
        <div className="mb-4 lg:mb-0">
          <img src="/logo.png" alt="Site Logo" className="w-16 h-16" />
          <h2 className="text-2xl montserrat font-semibold mb-2">toBuy</h2>
        </div>

        {/* Column 2: Navbar Links */}
        <div className="mb-4 lg:mb-0">
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul>
            <li className="mb-2">
              <a href="/">Home</a>
            </li>
            <li className="mb-2">
              <a href="/about">About Us</a>
            </li>
            <li className="mb-2">
              <a href="/products">Products</a>
            </li>
            {/* Add more links as needed */}
          </ul>
        </div>

        {/* Column 3: Subscription */}
        <div className="mb-4 lg:mb-0">
          <h2 className="text-lg font-semibold mb-2">
            Subscribe to Our Newsletter
          </h2>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="mr-2 p-2 border text-black outline-none border-white rounded-l-md"
            />
            <button className="bg-blue-500 text-white p-2 rounded-r-md">
              Subscribe
            </button>
          </div>
        </div>

        {/* Column 4: Follow Us */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
