'use client';

import { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeContext } from '@/context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext) ?? {
    theme: 'light',
    toggleTheme: () => {},
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Auth mock
  const handleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4  border-b bg-background z-50">
      {/* Left: Logo */}
      <span className="text-2xl font-bold text-cyan-400">TaskNest</span>

      {/* Right: Desktop buttons */}
      <div className="hidden md:flex items-center gap-4">
        <button
          aria-label="Toggle Dark Mode"
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-primary" />
          )}
        </button>

        <Button variant="outline" onClick={handleAuth}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </div>

      {/* Right: Mobile menu toggle button */}
      <button
        aria-label="Toggle Menu"
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile menu content */}
      {menuOpen && (
        <div className="absolute top-full right-4 mt-2 flex flex-col items-end bg-background border rounded-md p-4 gap-4 shadow-lg md:hidden z-50">
          <button
            aria-label="Toggle Dark Mode"
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-primary" />
            )}
          </button>

          <Button
            variant="outline"
            onClick={() => {
              handleAuth();
              setMenuOpen(false);
            }}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </div>
      )}
    </nav>
  );
}
