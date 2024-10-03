"use client"; // Mark this component as a client component

import { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  // Initialize state directly from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      // Ensure window is defined to access localStorage
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme : 'light'; // Default to light mode if none is found
    }
    return savedTheme;
  });

  useEffect(() => {
    // Apply the selected theme to the document on mount
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme); // Save preference in localStorage
  }, [theme]);

  const toggleTheme = () => {
    // Toggle between light and dark theme
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button onClick={toggleTheme} className=" rounded">
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
};

export default DarkModeToggle;
