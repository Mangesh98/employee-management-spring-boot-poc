import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Start with null to force explicit authentication check
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  const API_URL = 'http://localhost:8081';

  // Check if user is already authenticated on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/employees`, {
        method: 'GET',
        credentials: 'include', // Important: include cookies
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'manual', // Don't follow redirects automatically
      });

      // Status 200 means authenticated
      if (response.ok && response.status === 200) {
        setIsAuthenticated(true);
        setUser({ username: 'User' }); // Placeholder
      } else {
        // Any other status (302 redirect, 401, 403) means not authenticated
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      // If backend is not running or network error, treat as not authenticated
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setAuthChecked(true);
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      // Create form data for Spring Security login
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        credentials: 'include', // Important: include cookies
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setUser({ username });
        return { success: true };
      } else {
        return { success: false, error: 'Invalid username or password' };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include', // Important: include cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, authChecked }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
