'use client';

export function DashboardJs({ theme }) {
  return (
    <main className={`flex-1 p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h2 className={`text-3xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        Welcome to Your Dashboard
      </h2>
      <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        Select an option from the sidebar to manage users, roles, permissions, projects, and modes.
      </p>
    </main>
  );
}
