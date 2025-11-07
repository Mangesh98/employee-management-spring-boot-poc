import { useState } from 'react';

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    organization: employee?.organization || '',
    location: employee?.location || '',
    salary: employee?.salary || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.salary) {
      newErrors.salary = 'Salary is required';
    } else if (formData.salary <= 0) {
      newErrors.salary = 'Salary must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        salary: parseFloat(formData.salary)
      });
    }
  };

  return (
    <div>
      <div className="mb-5 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {employee ? 'Edit Employee' : 'Add New Employee'}
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          {employee ? 'Update employee information' : 'Fill in the details to add a new employee'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border-2 ${
              errors.name ? 'border-red-400' : 'border-white/50'
            } focus:border-purple-500 focus:outline-none transition-all duration-300`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border-2 ${
              errors.email ? 'border-red-400' : 'border-white/50'
            } focus:border-purple-500 focus:outline-none transition-all duration-300`}
            placeholder="john.doe@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Organization Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Organization *
          </label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border-2 ${
              errors.organization ? 'border-red-400' : 'border-white/50'
            } focus:border-purple-500 focus:outline-none transition-all duration-300`}
            placeholder="Tech Corp"
          />
          {errors.organization && <p className="text-red-500 text-xs mt-1">{errors.organization}</p>}
        </div>

        {/* Location Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border-2 ${
              errors.location ? 'border-red-400' : 'border-white/50'
            } focus:border-purple-500 focus:outline-none transition-all duration-300`}
            placeholder="New York, USA"
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
        </div>

        {/* Salary Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Annual Salary *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-500 font-semibold">₹</span>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className={`w-full pl-8 pr-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border-2 ${
                errors.salary ? 'border-red-400' : 'border-white/50'
              } focus:border-purple-500 focus:outline-none transition-all duration-300`}
              placeholder="75000"
              step="0.01"
            />
          </div>
          {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 rounded-xl font-semibold text-gray-700 bg-white/50 hover:bg-white/70 transition-all duration-300 order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 rounded-xl font-semibold text-white bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg order-1 sm:order-2"
          >
            {employee ? 'Update Employee' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
