"use client"; // Ensure it's a client-side component

import React, { useState } from 'react';
import Sidebar from '@/components/sidebar'; // Assuming you have this component

const BaseLayout = ({ children }) => {
  // State to track sidebar open/close status
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body>
        <div className="flex lg:flex-row min-h-screen">
          {/* Hamburger icon visible on small and medium screens */}
          {!isSidebarOpen && (
            <button
              className=" flex mt-1 p-4 lg:hidden focus:outline-none"
              onClick={toggleSidebar}
            >
              {/* Hamburger icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}

          {/* Sidebar component, pass the toggle state and function */}
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          {/* Main content */}
          <main className="flex-1 p-4">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default BaseLayout;
