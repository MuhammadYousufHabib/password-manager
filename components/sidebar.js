"use client"; // Add this directive to use hooks

import React, { useState } from 'react';
import Link from 'next/link';
import DarkModeToggle from "../app/DarkModeToggle";
import { UsersIcon, ShieldIcon, KeyIcon, FolderIcon, LayersIcon, MenuIcon } from 'lucide-react';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className=" bg-card shadow-md">
      {/* Hamburger icon for small screens */}
      <div className="lg:hidden flex justify-between items-center p-2 ">
        <button onClick={toggleSidebar}>
          <MenuIcon className="h-8 w-8 text-foreground" />
        </button>
        {isSidebarOpen ? null : <DarkModeToggle />}
        </div>

      {/* Sidebar toggling based on screen size */}
      <div className={`lg:block ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <aside className="w-64 h-[90vh] lg:h-[100vh] bg-card shadow-md">
          <div className="p-4 flex items-center">
            <DarkModeToggle/>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <nav className="mt-6">
            <Link
              href="/dashboard/users"
              className="flex items-center px-4 py-2 hover:bg-muted-foreground"
            >
              <UsersIcon className="w-5 h-5 mr-3" />
              Users
            </Link>
            <Link
              href="/dashboard/roles"
              className="flex items-center px-4 py-2 mt-1 hover:bg-muted-foreground"
            >
              <ShieldIcon className="w-5 h-5 mr-3" />
              Roles
            </Link>
            <Link
              href="/dashboard/permissions"
              className="flex items-center px-4 py-2 mt-1 hover:bg-muted-foreground"
            >
              <KeyIcon className="w-5 h-5 mr-3" />
              Permissions
            </Link>
            <Link
              href="/dashboard/projects"
              className="flex items-center px-4 py-2 mt-1 hover:bg-muted-foreground"
            >
              <FolderIcon className="w-5 h-5 mr-3" />
              Projects
            </Link>
            <Link
              href="/dashboard/modes"
              className="flex items-center px-4 py-2 mt-1 hover:bg-muted-foreground"
            >
              <LayersIcon className="w-5 h-5 mr-3" />
              Modes
            </Link>
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
