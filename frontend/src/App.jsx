import './App.css'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import EmployeeManagement from './components/EmployeeManagement'

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 py-6 px-4 md:py-8 md:px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="glass-card rounded-3xl shadow-2xl p-6 md:p-10">
              <EmployeeManagement /> 
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  )
}

export default App
