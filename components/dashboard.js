'use client';

export function DashboardJs({ theme }) {
  return (
    <main className={`flex-1 p-8 dark:bg-gray-800 dark:text-white`}>
      <h2 className={`text-3xl font-semibold dark:bg-gray-800 dark:text-white`}>
        Welcome to Your Dashboard
      </h2>
      <p className={`mt-4 dark:bg-gray-800 dark:text-white`}>
        Select an option from the sidebar to manage users, roles, permissions, projects, and modes.
      </p>
    </main>
  );
}
