import { useTutorData } from './hooks/useTutorData';
import Dashboard from './components/Dashboard';
import CalendarGrid from './components/CalendarGrid'; 
import AdminControls from './components/AdminControls';

function App() {
  const data = useTutorData();
  const currentDate = new Date();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12 flex items-center justify-between">
           <div className="flex items-center gap-5">
             <div className="bg-blue-600 text-white p-3.5 rounded-2xl shadow-blue-500/20 shadow-lg transform -rotate-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
             </div>
             <div>
               <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white">Tutor Tracker</h1>
               <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mt-2">
                   <div className="flex items-center gap-2">
                       <span className="text-blue-500 font-medium text-lg capitalize">{monthName}</span>
                       <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                       <span className="text-slate-400 text-sm">Strict Mode</span>
                   </div>
                   <div className="hidden md:block h-4 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
                   <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +880 1521-703968
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            abubakarmunshi786@gmail.com
                        </span>
                   </div>
               </div>
             </div>
           </div>
        </header>

        <Dashboard
          totalDays={data.totalDays}
          earnings={data.earnings}
          rate={data.rate}
        />

        <CalendarGrid
          days={data.days}
          onToggle={data.toggleDay}
          onTopicChange={data.updateTopic}
          isMasterUnlock={data.isMasterUnlock}
          isAdmin={data.isAdmin}
        />

        <AdminControls
          isAdmin={data.isAdmin}
          toggleAdmin={data.setIsAdmin}
          isMasterUnlock={data.isMasterUnlock}
          attemptMasterUnlock={data.attemptMasterUnlock}
          lockMaster={data.lockMaster}
          resetCycle={data.resetCycle}
          rate={data.rate}
          setRate={data.setRate}
          salary={data.salary}
          setSalary={data.setSalary}
        />
        
        <footer className="mt-16 pb-8 text-center text-slate-400 dark:text-slate-600 text-sm font-medium">
            &copy; {new Date().getFullYear()} Tutor Tracker
        </footer>
      </div>
    </div>
  );
}

export default App;
