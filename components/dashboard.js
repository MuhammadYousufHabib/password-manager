'use client';
import { useEffect, useState } from 'react';
import { get_me } from "@/services/api/me";

export function DashboardJs() {
  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUser = async () => {
    try {
      const response = await get_me();
      setCurrentUser(response.username);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <main className="flex-1 p-8 dark:bg-gray-700 dark:text-white">
      <h2 className="text-3xl font-semibold ">Welcome {currentUser ? currentUser : "Guest"}</h2>
      <p className="mt-4 ">
        Select an option from the sidebar to manage users, roles, permissions, projects, and modes.
      </p>
    </main>
  );
}
