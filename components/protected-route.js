// components/ProtectedRoute.js
"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');  

    if (!token) {
      router.push('/login');  
    } else {
      setIsAuthenticated(true);
    }
    
    setLoading(false); 
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? children : null;
}
