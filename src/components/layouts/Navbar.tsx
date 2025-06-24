'use client';

import { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeContext } from '@/context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext) ?? {
    theme: 'light',
    toggleTheme: () => {},
  };
  const [menuOpen, setMenuOpen] = useState(false);

  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  // 👉 Replace with YOUR namespace used in Action
  const roles = user?.['https://tnest.com'] || [];
  if (isLoading) return <p>Loading...</p>;

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 border-b bg-background z-50">
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

        {isAuthenticated ? (
          <>
            {/* Optional: show name */}
            <span className="text-sm text-primary">
              {user?.name} {roles.includes('admin') && '(Admin)'}
            </span>

            <Button
              variant="outline"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            onClick={() =>
              loginWithRedirect({
                authorizationParams: {
                  redirect_uri: window.location.origin + '/home',
                },
              })
            }
          >
            Login
          </Button>
        )}
      </div>

      {/* Right: Mobile menu toggle */}
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

          {isAuthenticated ? (
            <>
              <span className="text-sm text-primary mb-2">
                {user?.name} {roles.includes('admin') && '(Admin)'}
              </span>

              <Button
                variant="outline"
                onClick={() => {
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  });

                  setMenuOpen(false);
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                loginWithRedirect({
                  authorizationParams: {
                    redirect_uri: window.location.origin + '/home',
                  },
                });
                setMenuOpen(false);
              }}
            >
              Login
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
