import { useAuth } from '../context/AuthContext';
import LoginForm from './LoginForm';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, authChecked } = useAuth();

  // Show loading spinner while checking authentication
  if (loading || !authChecked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="glass-card p-12 rounded-3xl shadow-2xl">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-600"></div>
        </div>
      </div>
    );
  }

  // Only show children (EmployeeManagement) if explicitly authenticated
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return children;
};

export default ProtectedRoute;
