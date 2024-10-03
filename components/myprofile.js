"use client"; // This makes it a client component

import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';

export function ProfileJS() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [permission, setPermission] = useState('');

  // Fetch user data from API and prepopulate fields
  useEffect(() => {
    // Replace with your API endpoint to fetch user data
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

  return (
  
    <form className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-6 dark:bg-gray-800 dark:text-gray-100">
      {/* Name Field */}
      <div className="space-y-1">
        <Label htmlFor="name" className="text-sm font-medium">Name</Label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-md p-3 w-full text-sm dark:bg-gray-700 dark:border-gray-600"
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
          className="border rounded-md p-3 w-full text-sm dark:bg-gray-700 dark:border-gray-600"
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
          className="border rounded-md p-3 w-full text-sm dark:bg-gray-700 dark:border-gray-600"
          placeholder="Enter your email"
        />
      </div>

      {/* Role Field */}
      <div className="space-y-1 flex item-center justify-between">
        <Label htmlFor="role" className="text-sm font-medium">Role</Label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className=" text-sm dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="" disabled></option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>

      {/* Permission Field */}
      <div className="space-y-1 flex item-center justify-between">
        <Label htmlFor="permission" className="text-sm font-medium">Permission</Label>
        <select
          id="permission"
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          className=" dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="" disabled></option>
          <option value="read">Read</option>
          <option value="write">Write</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </form>
  );
}
