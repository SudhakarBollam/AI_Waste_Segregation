function StatsCard({ title, value, color, icon }) {
  const iconMap = {
    total: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    recyclable: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    nonrecyclable: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
  };

  const colorClasses = {
    "text-ai": "from-indigo-500/20 to-violet-500/20 border-indigo-200/60 text-indigo-600",
    "text-eco": "from-emerald-500/20 to-green-500/20 border-emerald-200/60 text-emerald-600",
    "text-red-500": "from-red-500/20 to-rose-500/20 border-red-200/60 text-red-600",
  };

  const bgClass = colorClasses[color] || colorClasses["text-ai"];

  return (
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${bgClass} rounded-bl-full opacity-80`} />
      <div className="relative">
        <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${bgClass} mb-4`}>
          {iconMap[icon] || iconMap.total}
        </div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <p className={`text-2xl md:text-3xl font-bold ${color}`}>{value}</p>
      </div>
    </div>
  );
}

export default StatsCard;
