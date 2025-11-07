const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="glass-card p-5 md:p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-default">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm text-gray-600 font-medium mb-1 truncate">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-800 truncate">{value}</p>
        </div>
        <div className={`text-3xl md:text-5xl p-3 md:p-4 rounded-2xl bg-linear-to-br ${color} bg-opacity-10 shrink-0`}>
          {icon}
        </div>
      </div>
      <div className={`mt-3 md:mt-4 h-1.5 md:h-2 rounded-full bg-linear-to-r ${color} opacity-60`}></div>
    </div>
  );
};

export default StatsCard;
