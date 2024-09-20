import React from 'react';
import Sidebar from '@/components/sidebar';
import ProtectedRoute from '@/components/protected-route';

const BaseLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col lg:flex-row min-h-screen">
          <Sidebar className="lg:w-1/4 w-full bg-gray-200 p-4" />
          <ProtectedRoute>
          <main className="flex-1 p-4">{children}</main>
          </ProtectedRoute>
        </div>
      </body>
    </html>
  );
};

export default BaseLayout;
