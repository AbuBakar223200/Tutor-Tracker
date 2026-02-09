import React, { useState } from 'react';

const DayRow = ({ day, onToggle, onTopicChange, isMasterUnlock, isAdmin }) => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const isToday = day.date === todayStr;
  
  // Strict Logic:
  // - Enabled if Date === Today
  // - OR if Master Unlock is ON
  // - OR if it's already Taught (to uncheck it? No, rule says "cannot be unchecked unless Master Unlock is toggled")
  // Wait, rule: "A user can ONLY 'Check-in' for the current calendar date."
  // "If a date is in the past or the future, the selection button/checkbox must be disabled"
  // "Once a day is marked as 'Taught', it cannot be unchecked unless a 'Master Unlock' is toggled."
  
  const isPast = day.date < todayStr;
  const isFuture = day.date > todayStr;

  // Conditions to allow toggling:
  // 1. It is Today AND it is currently NOT taught (Checking in)
  // 2. Master Unlock is ON (can do anything)
  // 3. User wants to check out? "cannot be unchecked unless Master Unlock is toggled".
  //    So even on Today, if I check it, I can't uncheck it immediately without unlock? Or maybe "Check-in" implies one-way?
  //    Usually "Check-in" allows undoing within the same session/day.
  //    Let's interpret: "Once marked Taught, cannot be unchecked PERIOD unless Master Unlock". 
  //    Even if today? That's strict. But okay.
  
  // Revised Logic:
  // disabled if:
  // - Admin is OFF (hidden/disabled strings attached) -> "Admin Toggle... When OFF, all buttons are hidden/disabled"
  // - Button disabled if:
  //    - !isMasterUnlock AND (isPast OR isFuture)
  //    - !isMasterUnlock AND isTaught (can't uncheck)
  
  const isInteractable = isAdmin && (isMasterUnlock || (isToday && !day.isTaught));

  const handleToggle = () => {
    if (isInteractable || isMasterUnlock) { // explicit unlock overrides interactable
      onToggle(day.date);
    }
  };

  // Date formatting
  const dateObj = new Date(day.date);
  const dateDisplay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });

  return (
    <div className={`
      flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-700 transition-colors
      ${isToday ? 'bg-blue-50 dark:bg-slate-800/50 ring-2 ring-blue-400 dark:ring-blue-500 z-10 rounded-lg my-2' : 'bg-white dark:bg-slate-800'}
      ${!isAdmin ? 'opacity-70 grayscale' : ''}
    `}>
      {/* Date & Status */}
      <div className="flex items-center space-x-4 min-w-[30%]">
        <div className="flex flex-col">
          <span className={`text-base font-semibold ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>
            {dateDisplay}
          </span>
          {isToday && <span className="text-xs text-blue-500 font-medium animate-pulse">Today</span>}
        </div>
        
        {/* Status Badge */}
        <span className={`
          px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide
          ${day.isTaught 
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
            : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}
        `}>
          {day.isTaught ? 'Taught' : 'Pending'}
        </span>
      </div>

      {/* Topic Input */}
      <div className="flex-grow mx-4">
        <input
          type="text"
          value={day.topic}
          onChange={(e) => onTopicChange(day.date, e.target.value)}
          placeholder="Topic covered..."
          disabled={!isAdmin || (!isToday && !isMasterUnlock)}
          className="w-full bg-transparent border-b border-transparent focus:border-blue-400 outline-none text-slate-600 dark:text-slate-300 placeholder-slate-400 text-sm py-1 transition-all"
        />
      </div>

      {/* Action Button */}
      <button
        onClick={handleToggle}
        disabled={!isInteractable && !isMasterUnlock}
        className={`
          relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
          ${day.isTaught 
            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200/50' 
            : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-200/50'}
          disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
          shadow-lg
        `}
      >
        {day.isTaught ? (isMasterUnlock ? 'Uncheck' : 'Done') : 'Mark Today'}
      </button>
    </div>
  );
};

export default DayRow;
