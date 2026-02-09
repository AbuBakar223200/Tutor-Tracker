import React, { useState } from 'react';

const AdminControls = ({ isAdmin, toggleAdmin, isMasterUnlock, attemptMasterUnlock, lockMaster, resetCycle, rate, setRate, salary, setSalary }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [error, setError] = useState(false);
  const [rateInput, setRateInput] = useState(rate);

  const handleUnlock = () => {
    if (attemptMasterUnlock(passwordInput)) {
      setShowPasswordInput(false);
      setPasswordInput('');
      setError(false);
    } else {
      setError(true);
    }
  };

  const updateRate = (e) => {
      const val = Number(e.target.value);
      setRateInput(val);
      setRate(val);
  };

  return (
    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Admin & Config */}
        <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="flex items-center justify-between md:justify-start gap-4">
                 <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Admin Mode</span>
                    <button 
                        onClick={() => toggleAdmin(!isAdmin)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${isAdmin ? 'bg-blue-500' : 'bg-slate-300'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${isAdmin ? 'left-7' : 'left-1'}`} />
                    </button>
                </div>
            </div>

            {isAdmin && (
                <div className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <label className="text-xs text-slate-500 uppercase font-bold">Rate/Class:</label>
                    <input 
                        type="number" 
                        value={rateInput} 
                        onChange={updateRate}
                        className="w-20 bg-transparent border-b border-slate-300 text-sm focus:outline-none dark:text-white"
                     />
                </div>
            )}
        </div>

        {/* Right Side: Actions */}
        {isAdmin && (
            <div className="flex flex-wrap items-center justify-end gap-3 w-full md:w-auto">
                {/* Master Unlock */}
                {!isMasterUnlock ? (
                    showPasswordInput ? (
                        <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-right-4 duration-300">
                            <input 
                                type="password" 
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="Enter Password"
                                className={`w-32 px-3 py-1.5 text-sm border rounded-md outline-none focus:ring-2 ${error ? 'border-red-500 ring-red-200' : 'border-slate-300 focus:ring-blue-200'} dark:bg-slate-800 dark:border-slate-600 dark:text-white`}
                            />
                            <button 
                                onClick={handleUnlock}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-sm rounded-md transition-colors"
                            >
                                Unlock
                            </button>
                            <button 
                                onClick={() => { setShowPasswordInput(false); setError(false); }}
                                className="text-slate-400 hover:text-slate-600 px-2"
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => setShowPasswordInput(true)}
                            className="text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-500 flex items-center gap-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Master Unlock
                        </button>
                    )
                ) : (
                    <button 
                        onClick={lockMaster}
                        className="px-3 py-1.5 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                        Lock Editing
                    </button>
                )}

                {/* Reset Cycle */}
                <button 
                    onClick={resetCycle}
                    className="px-4 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-md text-sm font-medium transition-colors"
                >
                    Reset Cycle
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminControls;
