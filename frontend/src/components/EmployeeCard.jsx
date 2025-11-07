import { useState } from 'react';

const EmployeeCard = ({ employee, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="glass-card p-5 md:p-6 rounded-3xl transform transition-all duration-300 hover:shadow-2xl cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar Circle */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-linear-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg transition-transform duration-300 group-hover:scale-110">
          {employee.name.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Employee Info */}
      <div className="text-center mb-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 truncate" title={employee.name}>
          {employee.name}
        </h3>
        <p className="text-xs md:text-sm text-gray-500 mb-3 truncate" title={employee.email}>
          {employee.email}
        </p>
        
        <div className="flex flex-col gap-2">
          <div className="glass-chip px-3 md:px-4 py-2 rounded-xl">
            <span className="text-xs text-gray-600 font-medium">Organization</span>
            <p className="text-sm font-semibold text-gray-800 truncate" title={employee.organization}>
              {employee.organization}
            </p>
          </div>
          
          <div className="glass-chip px-3 md:px-4 py-2 rounded-xl">
            <span className="text-xs text-gray-600 font-medium">Location</span>
            <p className="text-sm font-semibold text-gray-800 flex items-center justify-center gap-1 truncate" title={employee.location}>
              📍 {employee.location}
            </p>
          </div>
          
          <div className="glass-chip px-3 md:px-4 py-2 rounded-xl bg-linear-to-r from-green-50 to-emerald-50">
            <span className="text-xs text-green-600 font-medium">Salary</span>
            <p className="text-base md:text-lg font-bold text-green-700">
              ₹{employee.salary.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onEdit(employee)}
        className={`w-full glass-button py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 ${
          isHovered
            ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg'
            : 'bg-white/50 text-gray-700'
        }`}
      >
        {isHovered ? '✏️ Edit Details' : 'View Details'}
      </button>
    </div>
  );
};

export default EmployeeCard;
