import { User } from '../contexts/AuthContext';
import { Home, LogOut, Settings, Heart, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Props {
  user: User | null;
  onSignOut: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToSignUp?: () => void;
}

export const Navbar = ({ user, onSignOut, onNavigateToLogin, onNavigateToSignUp }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (email?: string) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 p-2 rounded-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Habitat Hero</h1>
              <p className="text-sm text-gray-600">Find your perfect HDB home</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <button
                  onClick={onNavigateToLogin}
                  className="px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={onNavigateToSignUp}
                  className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-lg transition-colors font-medium"
                >
                  Sign Up
                </button>
              </>
            ) : user.isGuest ? (
              <>
                <button
                  onClick={onNavigateToLogin}
                  className="px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={onSignOut}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {getInitials(user.email)}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user.email || 'User'}</p>
                      <p className="text-xs text-gray-500 mt-1">{user.id}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                    >
                      <Settings className="w-4 h-4" />
                      Profile Settings
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                    >
                      <Heart className="w-4 h-4" />
                      My Saved Results
                    </button>
                    <div className="border-t border-gray-200 my-2"></div>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        onSignOut();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
