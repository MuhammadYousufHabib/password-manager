import React from 'react';
import Sidebar from '@/components/sidebar';


const BaseLayout = ({ children }) => {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground">
        <div className="flex lg:flex-row min-h-screen">
        <div>
        <Sidebar className="lg:w-1/4 w-full bg-card p-4 text-card-foreground" />
        </div>
          <main className="flex-1 p-4">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default BaseLayout;
