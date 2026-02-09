import React from 'react';

const Dashboard = ({ totalDays, earnings, rate }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-10">
      {/* Total Days */}
      <div className="flex flex-col p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <span className="text-gray-500 dark:text-slate-400 text-sm md:text-base font-bold uppercase tracking-wider">Days Taught</span>
        <span className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mt-2">{totalDays}</span>
      </div>

      {/* Earnings */}
      <div className="flex flex-col p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-emerald-100 dark:border-slate-700">
        <span className="text-emerald-600 dark:text-emerald-400 text-sm md:text-base font-bold uppercase tracking-wider">Earned</span>
        <div className="flex flex-col mt-2">
          <span className="text-4xl md:text-6xl font-extrabold text-emerald-600 dark:text-emerald-400">৳{earnings.toLocaleString()}</span>
          {rate > 0 && <span className="mt-1 text-sm md:text-base text-gray-400 font-medium">(@ ৳{rate}/class)</span>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
