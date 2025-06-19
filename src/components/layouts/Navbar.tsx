'use client';

import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeContext } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext) ?? {
    theme: 'light',
    toggleTheme: () => {},
  };
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Mock auth handler
  const handleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b bg-background">
      {/* Left: Logo */}
      <span className="text-xl font-bold text-primary">TaskNest</span>

      {/* Right: Theme toggle & Auth */}
      <div className="flex items-center gap-4">
        {/* Theme toggle button */}
        <button
          aria-label="Toggle Dark Mode"
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {/* Login / Logout Button */}
        <Button variant="outline" onClick={handleAuth}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </div>
    </nav>
  );
}
