import React from 'react';
import Link from 'next/link';
import { UsersIcon, ShieldIcon, KeyIcon, FolderIcon, LayersIcon } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="flex h-screen w-fit bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <nav className="mt-6">
          <Link
            href="/dashboard/users"
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            <UsersIcon className="w-5 h-5 mr-3" />
            Users
          </Link>
          <Link
            href="/dashboard/roles"
            className="flex items-center px-4 py-2 mt-1 text-gray-700 hover:bg-gray-200"
          >
            <ShieldIcon className="w-5 h-5 mr-3" />
            Roles
          </Link>
          <Link
            href="/dashboard/permissions"
            className="flex items-center px-4 py-2 mt-1 text-gray-700 hover:bg-gray-200"
          >
            <KeyIcon className="w-5 h-5 mr-3" />
            Permissions
          </Link>
          <Link
            href="/dashboard/projects"
            className="flex items-center px-4 py-2 mt-1 text-gray-700 hover:bg-gray-200"
          >
            <FolderIcon className="w-5 h-5 mr-3" />
            Projects
          </Link>
          <Link
            href="/dashboard/modes"
            className="flex items-center px-4 py-2 mt-1 text-gray-700 hover:bg-gray-200"
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
    