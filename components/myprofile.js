"use client"; 

import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';

const Table = ({ children, className }) => <table className={className}>{children}</table>;
const TableHead = ({ children }) => <thead>{children}</thead>;
const TableBody = ({ children }) => <tbody>{children}</tbody>;
const TableRow = ({ children, className, onClick }) => (
  <tr className={className} onClick={onClick}>
    {children}
  </tr>
);
const TableHeader = ({ children, className }) => <th className={className}>{children}</th>;

export function ProfileJS() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [permission, setPermission] = useState('');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showPermissionDropdown, setShowPermissionDropdown] = useState(false);

  // Fetch user data from API and repopulate fields
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user'); // Add your API URL here
        const data = await response.json();
        setName(data.name);
        setUsername(data.username);
        setEmail(data.email);
        setRole(data.role);
        setPermission(data.permission);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Handle dropdown item selection
  const handleRoleSelect = (value) => {
    setRole(value);
    setShowRoleDropdown(false); // Close dropdown after selection
  };

  const handlePermissionSelect = (value) => {
    setPermission(value);
    setShowPermissionDropdown(false); // Close dropdown after selection
  };

  return (
    <form className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      {/* Name Field */}
      <div className="space-y-1">
        <Label htmlFor="name" className="text-sm font-medium">Name</Label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-md p-3 w-full text-sm "
          placeholder="Enter your name"
        />
      </div>

      {/* Username Field */}
      <div className="space-y-1">
        <Label htmlFor="username" className="text-sm font-medium">Username</Label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-md p-3 w-full text-sm "
          placeholder="Enter your username"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-1">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-md p-3 w-full text-sm "
          placeholder="Enter your email"
        />
      </div>

      {/* Role Field */}
      <div className="space-y-1">
        <Label htmlFor="role" className="text-sm font-medium">Role</Label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="text-sm border rounded-md p-3 w-full "
          >
            {role || "Select role"}
          </button>
          {showRoleDropdown && (
            <div className="absolute z-50 bg-white border rounded-md shadow-md w-full  mt-1">
              <Table className="table-auto w-full">
                <TableHead>
                  <TableRow className="bg-gray-100 ">
                    <TableHeader className="text-left p-2">Role</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500" onClick={() => handleRoleSelect("admin")}>
                    <td className="p-2">Admin</td>
                  </TableRow>
                  <TableRow className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500" onClick={() => handleRoleSelect("editor")}>
                    <td className="p-2">Editor</td>
                  </TableRow>
                  <TableRow className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500" onClick={() => handleRoleSelect("viewer")}>
                    <td className="p-2">Viewer</td>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Permission Field */}
      <div className="space-y-1">
        <Label htmlFor="permission" className="text-sm font-medium">Permission</Label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPermissionDropdown(!showPermissionDropdown)}
            className="text-sm border rounded-md p-3 w-full "
          >
            {permission || "Select permission"}
          </button>
          {showPermissionDropdown && (
            <div className="absolute z-50 bg-white border rounded-md shadow-md w-full  mt-1">
              <Table className="table-auto w-full">
                <TableHead>
                  <TableRow className="bg-gray-100 ">
                    <TableHeader className="text-left p-2">Permission</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500" onClick={() => handlePermissionSelect("read")}>
                    <td className="p-2">Read</td>
                  </TableRow>
                  <TableRow className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500" onClick={() => handlePermissionSelect("write")}>
                    <td className="p-2">Write</td>
                  </TableRow>
                  <TableRow className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500" onClick={() => handlePermissionSelect("admin")}>
                    <td className="p-2">Admin</td>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}