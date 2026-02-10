import { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email?: string;
  isGuest?: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  guestLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('habitatHeroUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        isGuest: false,
        isAuthenticated: true,
      };
      setUser(newUser);
      localStorage.setItem('habitatHeroUser', JSON.stringify(newUser));
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        isGuest: false,
        isAuthenticated: true,
      };
      setUser(newUser);
      localStorage.setItem('habitatHeroUser', JSON.stringify(newUser));
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      setUser(null);
      localStorage.removeItem('habitatHeroUser');
    } finally {
      setLoading(false);
    }
  };

  const guestLogin = async () => {
    setLoading(true);
    try {
      const guestUser: User = {
        id: `guest_${Date.now()}`,
        isGuest: true,
        isAuthenticated: true,
      };
      setUser(guestUser);
      localStorage.setItem('habitatHeroUser', JSON.stringify(guestUser));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, guestLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
