import React from 'react';
import Sidebar from '@/components/sidebar';

const BaseLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col lg:flex-row min-h-screen bg-card dark:text-white">
          <Sidebar className="lg:w-1/4 w-full  p-4" />
          <main className="flex-1 p-4 ">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default BaseLayout;
