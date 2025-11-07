import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="glass-card p-4 md:p-6 rounded-3xl shadow-lg">
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl md:text-2xl pointer-events-none">
          🔍
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by organization name..."
          className="w-full pl-12 md:pl-14 pr-12 py-3 md:py-4 rounded-2xl bg-white/50 backdrop-blur-sm border-2 border-white/50 focus:border-purple-500 transition-all duration-300 text-gray-800 placeholder-gray-500 text-sm md:text-base"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors text-xl"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2 md:mt-3 ml-1">
        💡 Tip: Search by organization name to filter employees
      </p>
    </div>
  );
};

export default SearchBar;
