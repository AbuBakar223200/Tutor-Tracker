import React from 'react';

const DayCell = ({ day, onToggle, onTopicChange, isMasterUnlock, isAdmin, isEmpty, dayNum }) => {
  if (isEmpty) {
    return <div className="bg-slate-50/50 dark:bg-slate-800/20 border border-transparent min-h-[120px] md:min-h-[150px]"></div>;
  }

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const isToday = day.date === todayStr;
  
  const isInteractable = isAdmin && (isMasterUnlock || (isToday && !day.isTaught));

  const handleToggle = () => {
    if (isInteractable || isMasterUnlock) {
      onToggle(day.date);
    }
  };

  return (
    <div 
      className={`
        min-h-[120px] md:min-h-[150px] border border-slate-200 dark:border-slate-700 p-3 md:p-4 flex flex-col justify-between transition-all relative group
        ${isToday ? 'ring-4 ring-inset ring-blue-500/50 bg-blue-50/30 dark:bg-blue-900/10 z-10' : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50'}
        ${day.isTaught ? 'bg-emerald-50 dark:bg-emerald-900/10' : ''}
        ${!isAdmin ? 'opacity-80' : ''}
      `}
    >
        {/* Date Number & Indicator */}
        <div className="flex justify-between items-start">
            <span className={`text-lg md:text-xl font-bold ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>
                {dayNum}
            </span>
            {day.isTaught && (
                <div className="bg-emerald-100 dark:bg-emerald-900/50 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </div>

        {/* Topic Input */}
        <div className="flex-grow mt-2 flex items-center">
             {isAdmin && (
                <input
                    type="text"
                    value={day.topic}
                    onChange={(e) => onTopicChange(day.date, e.target.value)}
                    placeholder={!day.isTaught && isToday ? "Topic?" : ""}
                    disabled={!isAdmin || (!isToday && !isMasterUnlock)}
                    className="w-full bg-transparent text-xs md:text-sm text-slate-600 dark:text-slate-300 outline-none placeholder-slate-300 dark:placeholder-slate-600 font-medium"
                />
             )}
        </div>

        {/* Action Button */}
        <button
            onClick={handleToggle}
            disabled={!isInteractable && !isMasterUnlock}
            className={`
                w-full py-2 rounded-lg font-bold text-xs md:text-sm transition-all shadow-sm
                ${day.isTaught 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200' 
                    : (isToday ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-300/50 shadow-md transform active:scale-95' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 hover:bg-slate-200')}
                disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none
            `}
        >
            {day.isTaught ? 'Done' : (isToday ? 'Mark Today' : '-')}
        </button>
    </div>
  );
};

export default DayCell;
