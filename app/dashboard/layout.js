import React from 'react';
import Sidebar from '@/components/sidebar';

const BaseLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col lg:flex-row min-h-screen">
          <Sidebar className="lg:w-1/4 w-full bg-gray-200 p-4" />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default BaseLayout;
