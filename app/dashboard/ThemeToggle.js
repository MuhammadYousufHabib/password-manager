// app/ThemeToggle.js
"use client"; // This component needs to be client-side

import React from "react";
import { useTheme } from "./ThemeContext"; // Import your ThemeContext

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="p-2 rounded">
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
