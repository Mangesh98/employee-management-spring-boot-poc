import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import EmployeeCard from './EmployeeCard';
import EmployeeForm from './EmployeeForm';
import SearchBar from './SearchBar';
import StatsCard from './StatsCard';

const EmployeeManagement = () => {
  const { logout, user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const API_URL = 'http://localhost:8081/employees';

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        credentials: 'include', // Include cookies for authentication
      });
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
      } else if (response.status === 401) {
        showNotification('Session expired. Please login again.', 'error');
        logout();
      }
    } catch (error) {
      showNotification('Failed to fetch employees', 'error');
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredEmployees(employees);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/search?name=${encodeURIComponent(searchTerm)}`, {
        credentials: 'include', // Include cookies for authentication
      });
      if (response.ok) {
        const data = await response.json();
        setFilteredEmployees(data || []);
      } else if (response.status === 401) {
        showNotification('Session expired. Please login again.', 'error');
        logout();
      } else {
        setFilteredEmployees([]);
      }
    } catch (error) {
      showNotification('Search failed', 'error');
    }
  };

  const handleAddEmployee = async (employeeData) => {
    try {
      console.log("Employee Data:", employeeData);
      const method = editingEmployee ? 'PUT' : 'POST';
      const url = editingEmployee ? `${API_URL}/${editingEmployee.id}` : API_URL;
      
      const response = await fetch(url, {
        method,
        credentials: 'include', // Include cookies for authentication
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        const updatedEmployee = await response.json();
        
        if (editingEmployee) {
          // Update existing employee
          const updatedEmployees = employees.map(emp => 
            emp.id === editingEmployee.id ? updatedEmployee : emp
          );
          setEmployees(updatedEmployees);
          setFilteredEmployees(updatedEmployees);
          showNotification('Employee updated successfully', 'success');
        } else {
          // Add new employee
          const newEmployees = [...employees, updatedEmployee];
          setEmployees(newEmployees);
          setFilteredEmployees(newEmployees);
          showNotification('Employee added successfully', 'success');
        }
        
        setShowForm(false);
        setEditingEmployee(null);
      } else if (response.status === 401) {
        showNotification('Session expired. Please login again.', 'error');
        logout();
      }
    } catch (error) {
      showNotification(editingEmployee ? 'Failed to update employee' : 'Failed to add employee', 'error');
    }
  };

  const handleEditEmployee = (employee) => {
    if (!employee || !employee.id) {
      showNotification('Invalid employee data', 'error');
      return;
    }
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const calculateStats = () => {
    const totalEmployees = employees.length;
    const avgSalary = employees.length > 0 
      ? employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length 
      : 0;
    const organizations = new Set(employees.map(emp => emp.organization)).size;
    const locations = new Set(employees.map(emp => emp.location)).size;

    return { totalEmployees, avgSalary, organizations, locations };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-24 right-8 z-50 glass-card px-6 py-4 rounded-2xl shadow-2xl animate-slide-in ${
          notification.type === 'success' ? 'border-green-400' : 'border-red-400'
        } border-2`}>
          <p className={`font-medium ${
            notification.type === 'success' ? 'text-green-700' : 'text-red-700'
          }`}>
            {notification.message}
          </p>
        </div>
      )}

      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Employee Management
            </h1>
            <p className="text-gray-600 text-sm md:text-base">Manage your workforce with elegance</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                setEditingEmployee(null);
                setShowForm(true);
              }}
              className="glass-button px-8 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              + Add Employee
            </button>
            <button
              onClick={logout}
              className="glass-button px-8 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Total Employees" 
          value={stats.totalEmployees} 
          icon="👥"
          color="from-blue-500 to-cyan-500"
        />
        <StatsCard 
          title="Avg Salary" 
          value={`₹${stats.avgSalary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`} 
          icon="💰"
          color="from-green-500 to-emerald-500"
        />
        <StatsCard 
          title="Organizations" 
          value={stats.organizations} 
          icon="🏢"
          color="from-purple-500 to-pink-500"
        />
        <StatsCard 
          title="Locations" 
          value={stats.locations} 
          icon="📍"
          color="from-orange-500 to-red-500"
        />
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Employee Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fade-in" onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowForm(false);
            setEditingEmployee(null);
          }
        }}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-in p-6 md:p-8">
            <EmployeeForm
              employee={editingEmployee}
              onSubmit={handleAddEmployee}
              onCancel={() => {
                setShowForm(false);
                setEditingEmployee(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Employee Grid */}
      <div>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="glass-card p-8 rounded-3xl">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
            </div>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="glass-card p-12 rounded-3xl text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Employees Found</h3>
            <p className="text-gray-500">Try adjusting your search or add a new employee</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee, index) => (
              <EmployeeCard
                key={employee.id || `employee-${index}`}
                employee={employee}
                onEdit={handleEditEmployee}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeManagement;
