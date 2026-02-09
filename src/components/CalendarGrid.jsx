import React from 'react';
import DayCell from './DayCell';

const CalendarGrid = ({ days, onToggle, onTopicChange, isMasterUnlock, isAdmin }) => {
  if (days.length === 0) return null;

  const firstDayDate = new Date(days[0].date);
  const startDayOfWeek = firstDayDate.getDay(); 
  const padding = Array.from({ length: startDayOfWeek });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
        {weekDays.map(d => (
            <div key={d} className="py-4 text-center text-sm font-bold uppercase text-slate-500 tracking-wider">
                {d}
            </div>
        ))}
      </div>
      
      {/* Calendar Body */}
      <div className="grid grid-cols-7 bg-slate-200 dark:bg-slate-700 gap-[1px]">
        {padding.map((_, i) => (
            <div key={`pad-${i}`} className="bg-white dark:bg-slate-800 opacity-50 min-h-[120px] md:min-h-[150px]" />
        ))}
        {days.map((day) => {
             const d = new Date(day.date);
             return (
                <div key={day.date} className="bg-white dark:bg-slate-800">
                    <DayCell
                        day={day}
                        dayNum={d.getDate()}
                        onToggle={onToggle}
                        onTopicChange={onTopicChange}
                        isMasterUnlock={isMasterUnlock}
                        isAdmin={isAdmin}
                    />
                </div>
             );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
