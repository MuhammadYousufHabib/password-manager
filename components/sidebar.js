import React from "react";
import Link from "next/link";
import {
  UsersIcon,
  ShieldIcon,
  KeyIcon,
  FolderIcon,
  LayersIcon,
} from "lucide-react";
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
];

const Sidebar = () => {
  return (
    <div className="flex h-screen w-fit bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <nav className="mt-6">
          {routes.map((item) => (
            <CheckPermission permission={item.permission}>
              <Link
                href={item.href}
                className="flex items-center px-4 py-2 mt-1 text-gray-700 hover:bg-gray-200"
              >
                {item.icon()}
                {item.name}
              </Link>
            </CheckPermission>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
