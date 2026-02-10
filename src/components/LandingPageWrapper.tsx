import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LandingPage } from './LandingPage';
import { Home, LogOut } from 'lucide-react';

export const LandingPageWrapper = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="bg-teal-600 p-2 rounded-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Habitat Hero</h1>
            </div>
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </header>
      <LandingPage />
    </>
  );
};
