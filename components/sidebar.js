"use client"; // Mark this component as a client component

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DarkModeToggle from "../app/DarkModeToggle";
import { useRouter } from 'next/navigation'; // Use this for Client Components
import { UsersIcon, ShieldIcon, KeyIcon, FolderIcon, LayersIcon } from 'lucide-react';

const Sidebar = () => {
  const router = useRouter(); // Get router object
  const [activeLink, setActiveLink] = useState('/dashboard/users'); // Default active link

  // Update active link based on router pathname
  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  return (
    <div className="flex h-screen w-fit bg-card text-card-foreground">
      <aside className="w-64 bg-card shadow-md">
        <div className="p-4 flex items-center ">
          <DarkModeToggle/>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <nav className="mt-6">
          <Link
            href="/dashboard/users"
            className={`flex items-center px-4 py-2 ${activeLink === '/dashboard/users' ? 'bg-muted' : ''}`}
            onClick={() => setActiveLink('/dashboard/users')}
          >
            <UsersIcon className="w-5 h-5 mr-3" />
            Users
          </Link>
          <Link
            href="/dashboard/roles"
            className={`flex items-center px-4 py-2 mt-1 ${activeLink === '/dashboard/roles' ? 'bg-muted' : ''}`}
            onClick={() => setActiveLink('/dashboard/roles')}
          >
            <ShieldIcon className="w-5 h-5 mr-3" />
            Roles
          </Link>
          <Link
            href="/dashboard/permissions"
            className={`flex items-center px-4 py-2 mt-1 ${activeLink === '/dashboard/permissions' ? 'bg-muted' : ''}`}
            onClick={() => setActiveLink('/dashboard/permissions')}
          >
            <KeyIcon className="w-5 h-5 mr-3" />
            Permissions
          </Link>
          <Link
            href="/dashboard/projects"
            className={`flex items-center px-4 py-2 mt-1 ${activeLink === '/dashboard/projects' ? 'bg-muted' : ''}`}
            onClick={() => setActiveLink('/dashboard/projects')}
          >
            <FolderIcon className="w-5 h-5 mr-3" />
            Projects
          </Link>
          <Link
            href="/dashboard/modes"
            className={`flex items-center px-4 py-2 mt-1 ${activeLink === '/dashboard/modes' ? 'bg-muted' : ''}`}
            onClick={() => setActiveLink('/dashboard/modes')}
          >
            <LayersIcon className="w-5 h-5 mr-3" />
            Modes
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
