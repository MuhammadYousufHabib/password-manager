"use client"; // Add this directive to use hooks

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import DarkModeToggle from "../app/DarkModeToggle";
import { UsersIcon, ShieldIcon, KeyIcon, FolderIcon, LayersIcon, MenuIcon } from 'lucide-react';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null); // Reference to the sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle clicks outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Close the sidebar when a navigation link is clicked
  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="bg-card shadow-md">
      {/* Hamburger icon for small screens */}
      <div className="lg:hidden flex justify-between items-center p-2">
        <button onClick={toggleSidebar}>
          <MenuIcon className="h-8 w-8 text-foreground" />
        </button>
        {isSidebarOpen ? null : <DarkModeToggle />}
      </div>

      {/* Sidebar toggling based on screen size */}
      <div ref={sidebarRef} className={`lg:block ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <aside className="w-64 h-[90vh] lg:h-[100vh] bg-card shadow-md">
          <div className="p-4 flex items-center">
            <DarkModeToggle />
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <nav className="mt-6">
            <Link
              href="/dashboard/users"
              className="flex items-center px-4 py-2 hover:bg-muted-foreground"
              onClick={handleLinkClick} // Close sidebar on link click
            >
              <UsersIcon className="w-5 h-5 mr-3" />
              Users
            </Link>
            <Link
              href="/dashboard/roles"
              className="flex items-center px-4 py-2 mt-1 hover:bg-muted-foreground"
              onClick={handleLinkClick} // Close sidebar on link click
            >
              <ShieldIcon className="w-5 h-5 mr-3" />
              Roles
            </Link>
            <Link
              href="/dashboard/permissions"
              className="flex items-center px-4 py-2 mt-1 hover:bg-muted-foreground"
              onClick={handleLinkClick} // Close sidebar on link click
            >
              <KeyIcon className="w-5 h-5 mr-3" />
              Permissions
            </Link>
            <Link
              href="/dashboard/projects"
              className="flex items-center px-4 py-2 mt-1 hover:bg-muted-foreground"
              onClick={handleLinkClick} // Close sidebar on link click
            >
              <FolderIcon className="w-5 h-5 mr-3" />
              Projects
            </Link>
            <Link
              href="/dashboard/modes"
              className="flex items-center px-4 py-2 mt-1 hover:bg-muted-foreground"
              onClick={handleLinkClick} // Close sidebar on link click
            >
              <LayersIcon className="w-5 h-5 mr-3" />
              Modes
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center px-4 py-2 mt-1 hover:bg-muted-foreground"
              onClick={handleLinkClick} // Close sidebar on link click
            >
              <LayersIcon className="w-5 h-5 mr-3" />
              My Profile
            </Link>
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
