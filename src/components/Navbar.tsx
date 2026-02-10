import { User } from '../contexts/AuthContext';
import { Home, LogOut, UserPlus } from 'lucide-react';

interface Props {
  user: User;
  onSignOut: () => void;
}

export const Navbar = ({ user, onSignOut }: Props) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Habitat Hero</h1>
              <p className="text-sm text-gray-600">Find your perfect HDB home</p>
            </div>
          </div>

          {user?.isGuest ? (
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up to Save
              </button>
              <button
                onClick={onSignOut}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onSignOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
