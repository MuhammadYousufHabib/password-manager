"use client"; // Ensure it's a client-side component

import React from 'react';
import Link from 'next/link'; // Use Next.js's Link for routing
import { UsersIcon, ShieldIcon, KeyIcon, FolderIcon, LayersIcon } from 'lucide-react'; // Assuming you're using lucide-react for icons

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div>
      {/* Sidebar should slide in/out on small/medium screens */}
      <aside
        className={`fixed top-0 left-0 w-64 h-screen bg-white shadow-md transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 lg:translate-x-0 lg:static`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>

        {/* Navigation links */}
        <nav className="mt-6">
          <Link
            href="../dashboard/users"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
            onClick={toggleSidebar} // Close sidebar on link click
          >
            <UsersIcon className="w-5 h-5 mr-3" />
            Users
          </Link>
          <Link
            href="../dashboard/roles"
            className="flex items-center px-4 py-2 mt-1 text-gray-700 hover:bg-gray-200"
            onClick={toggleSidebar} // Close sidebar on link click
          >
            <ShieldIcon className="w-5 h-5 mr-3" />
            Roles
          </Link>
          <Link
            href="../dashboard/permissions"
            className="flex items-center px-4 py-2 mt-1 text-gray-700 hover:bg-gray-200"
            onClick={toggleSidebar} // Close sidebar on link click
          >
            <KeyIcon className="w-5 h-5 mr-3" />
            Permissions
          </Link>
          <Link
            href="../dashboard/projects"
            className="flex items-center px-4 py-2 mt-1 text-gray-700 hover:bg-gray-200"
            onClick={toggleSidebar} // Close sidebar on link click
          >
            <FolderIcon className="w-5 h-5 mr-3" />
            Projects
          </Link>
          <Link
            href="../dashboard/modes"
            className="flex items-center px-4 py-2 mt-1 text-gray-700 hover:bg-gray-200"
            onClick={toggleSidebar} // Close sidebar on link click
          >
            <LayersIcon className="w-5 h-5 mr-3" />
            Modes
          </Link>
        </nav>
      </aside>

      {/* Overlay to darken the screen when sidebar is open (on small screens) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
