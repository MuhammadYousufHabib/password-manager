
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
