
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AIAssistant from './components/AIAssistant';
import LabLayoutView from './components/tabs/LabLayoutView';
import MaterialsView from './components/tabs/MaterialsView';
import ScheduleView from './components/tabs/ScheduleView';
import ProjectGalleryView from './components/tabs/ProjectGalleryView';
import LessonPathDetail from './components/LessonPathDetail';
import { TabType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Lab Layout');
  const [isLearningMode, setIsLearningMode] = useState(false);
  const [learningLevelIndex, setLearningLevelIndex] = useState(0);
  
  // New State for Login/Account
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const startLearning = () => {
    setLearningLevelIndex(0);
    setIsLearningMode(true);
  };

  const nextLevel = () => {
    setLearningLevelIndex(prev => Math.min(prev + 1, 2));
  };

  const exitLearning = () => {
    setIsLearningMode(false);
  };

  const renderContent = () => {
    if (isLearningMode) {
      return (
        <LessonPathDetail 
          currentLevelIndex={learningLevelIndex} 
          onNext={nextLevel} 
          onExit={exitLearning} 
        />
      );
    }

    switch (activeTab) {
      case 'Lab Layout': return <LabLayoutView onEnroll={startLearning} />;
      case 'Materials': return <MaterialsView />;
      case 'Schedule': return <ScheduleView />;
      case 'Project Gallery': return <ProjectGalleryView />;
      default: return <LabLayoutView onEnroll={startLearning} />;
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50/30 pb-20">
      {/* Decorative top bar */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 w-full fixed top-0 z-[60]"></div>
      
      <header className={`pt-8 px-6 max-w-7xl mx-auto transition-opacity duration-300 ${isLearningMode ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
               <i className="fa-solid fa-flask-vial"></i>
             </div>
             <div>
               <div className="text-slate-900 font-black text-lg leading-none">MakerLab</div>
               <div className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Design Workspace</div>
             </div>
          </div>

          {/* Account/Login Section Replacement */}
          <div className="flex items-center gap-4 relative">
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsLoggedIn(true)}
                  className="px-5 py-2 text-slate-600 font-bold text-xs hover:text-slate-900 transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setIsLoggedIn(true)}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
                >
                  Create Account
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button className="relative w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                  <i className="fa-solid fa-bell text-sm"></i>
                  <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></span>
                </button>
                
                <div className="h-8 w-px bg-slate-200"></div>

                <div className="relative">
                  <button 
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                    className="flex items-center gap-3 pl-1 pr-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
                  >
                    <img 
                      src="https://picsum.photos/seed/user-main/100/100" 
                      className="w-8 h-8 rounded-full object-cover border-2 border-indigo-50" 
                      alt="User Profile" 
                    />
                    <div className="text-left hidden sm:block">
                      <div className="text-[10px] font-black text-slate-900 leading-none">Alex Johnson</div>
                      <div className="text-[8px] text-emerald-500 font-bold uppercase tracking-widest mt-0.5">Pro Member</div>
                    </div>
                    <i className={`fa-solid fa-chevron-down text-[8px] text-slate-400 transition-transform ${showAccountMenu ? 'rotate-180' : ''}`}></i>
                  </button>

                  {showAccountMenu && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-[70] animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-slate-50 mb-2">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Active Plan</p>
                        <p className="text-xs font-bold text-indigo-600">Premium Explorer</p>
                      </div>
                      <button className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                        <i className="fa-solid fa-user text-slate-400"></i> My Profile
                      </button>
                      <button className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                        <i className="fa-solid fa-gear text-slate-400"></i> Settings
                      </button>
                      <button className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                        <i className="fa-solid fa-credit-card text-slate-400"></i> Billing
                      </button>
                      <div className="h-px bg-slate-50 my-2"></div>
                      <button 
                        onClick={() => { setIsLoggedIn(false); setShowAccountMenu(false); }}
                        className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 flex items-center gap-3 transition-colors"
                      >
                        <i className="fa-solid fa-sign-out-alt"></i> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white p-1.5 rounded-2xl flex items-center gap-1 shadow-sm border border-slate-100 max-w-fit mb-10 overflow-x-auto">
          {[
            { id: 'Lab Layout', icon: 'fa-hammer' },
            { id: 'Materials', icon: 'fa-box-open' },
            { id: 'Schedule', icon: 'fa-calendar-days' },
            { id: 'Project Gallery', icon: 'fa-images' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <i className={`fa-solid ${tab.icon} ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`}></i>
              {tab.id}
            </button>
          ))}
        </div>
      </header>

      <main className={`max-w-7xl mx-auto px-6 transition-all duration-500 ${isLearningMode ? 'mt-8' : ''}`}>
        <div className={`bg-white rounded-[2.5rem] shadow-xl shadow-indigo-100/50 border border-indigo-100/50 min-h-[600px] relative overflow-hidden transition-all duration-500 ${isLearningMode ? 'p-0' : 'p-8 md:p-12'}`}>
          {renderContent()}
        </div>
      </main>

      <AIAssistant />
    </div>
  );
};

export default App;
