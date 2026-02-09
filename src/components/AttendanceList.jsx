import React from 'react';
import DayRow from './DayRow';

const AttendanceList = ({ days, onToggle, onTopicChange, isMasterUnlock, isAdmin }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-4 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <span>Date</span>
        <span>Topic</span>
        <span>Action</span>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden divide-y divide-gray-100 dark:divide-slate-700">
        {days.map(day => (
          <DayRow
            key={day.date}
            day={day}
            onToggle={onToggle}
            onTopicChange={onTopicChange}
            isMasterUnlock={isMasterUnlock}
            isAdmin={isAdmin}
          />
        ))}
        {days.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            No days found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceList;
