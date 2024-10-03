"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UsersIcon, ShieldIcon, KeyIcon, FolderIcon, LayersIcon, MenuIcon, XIcon,LogOutIcon } from "lucide-react";
import CheckPermission from "./CheckPermission";
import DarkModeToggle from "@/app/dashboard/DarkModeToggle";
import { deleteCookie } from 'cookies-next'; 
import { useRouter } from "next/navigation"; 
import { get_me } from "@/services/api/me";

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
  const [currentUser, setcurrentUser] = useState()

  const getCurrentUser=  async()=>{
    const response =await get_me()
    console.log(response.username)
   setcurrentUser(response.username)
   }
   useEffect(() => {
      getCurrentUser()
   }, [])
  

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); 
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };
  const handleLogout = () => {
    deleteCookie('access_token');
    
    router.push('/login');
  };
  return (
    <div className="relative ">
      <div className="  flex items-center lg:hidden">  
        <button
          className="lg:hidden p-2 focus:outline-none"
          onClick={toggleSidebar}
          >
          {isOpen ? (
            <XIcon className="w-6 h-6 " />
          ) : (
            <MenuIcon className="w-6 h-6 " />
          )}
        </button>
        {isOpen ? null : <DarkModeToggle  />}
       </div>


      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-40 w-64 h-screen  shadow-md transform transition-transform lg:translate-x-0 lg:static lg:h-screen lg:w-64 bg-card dark:text-white`}
      >
        <div className="p-4 flex items-center justify-between lg:block">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold ">Dashboard</h1>
            <DarkModeToggle/>
          </div>
          {/* Close button for mobile */}
          <button className="lg:hidden p-2 focus:outline-none" onClick={toggleSidebar}>
            <XIcon className="w-6 h-6 " />
          </button>
        </div>
        <nav className="mt-6">
          {routes.map((item, index) => (
            <CheckPermission permission={item.permission} key={index}>
              <Link
                href={item.href}
                className="flex items-center px-4 py-2 mt-1  hover:bg-gray-500"
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
              <div className="absolute bottom-0 w-full mb-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-red-500 hover:text-white"
          >
            <LogOutIcon className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>

    </div>
  );
};

export default Sidebar;
