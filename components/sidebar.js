"use client"; // Required for using useState in Next.js

import React, { useState } from "react";
import Link from "next/link";
import { UsersIcon, ShieldIcon, KeyIcon, FolderIcon, LayersIcon, MenuIcon, XIcon } from "lucide-react";
import CheckPermission from "./CheckPermission";

const routes = [
  {
    name: "Users",
    href: "/dashboard/users",
    icon: () => <UsersIcon className="w-5 h-5 mr-3" />,
    permission: "USER:LIST",
  },
  {
    name: "Roles",
    href: "/dashboard/roles",
    icon: () => <ShieldIcon className="w-5 h-5 mr-3" />,
    permission: "ROLE:GET:ALL",
  },
  {
    name: "Permissions",
    href: "/dashboard/permissions",
    icon: () => <KeyIcon className="w-5 h-5 mr-3" />,
    permission: "PERMISSION:GET:ALL",
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: () => <FolderIcon className="w-5 h-5 mr-3" />,
    permission: "PROJECT:GET:ALL",
  },
  {
    name: "Modes",
    href: "/dashboard/modes",
    icon: () => <LayersIcon className="w-5 h-5 mr-3" />,
    permission: "MODE:GET:ALL",
  },
  {
    name: "My Profile",
    href: "/dashboard/profile",
    icon: () => <ShieldIcon className="w-5 h-5 mr-3" />,
    permission: "ROLE:GET:ALL", 
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        className="lg:hidden p-2 focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <XIcon className="w-6 h-6 text-gray-800" />
        ) : (
          <MenuIcon className="w-6 h-6 text-gray-800" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-md transform transition-transform lg:translate-x-0 lg:static lg:h-screen lg:w-64`}
      >
        <div className="p-4 flex items-center justify-between lg:block">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          {/* Close button for mobile */}
          <button className="lg:hidden p-2 focus:outline-none" onClick={toggleSidebar}>
            <XIcon className="w-6 h-6 text-gray-800" />
          </button>
        </div>
        <nav className="mt-6">
          {routes.map((item, index) => (
            <CheckPermission permission={item.permission} key={index}>
              <Link
                href={item.href}
                className="flex items-center px-4 py-2 mt-1 text-gray-700 hover:bg-gray-200"
                onClick={closeSidebar}
              >
                {item.icon()}
                {item.name}
              </Link>
            </CheckPermission>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
