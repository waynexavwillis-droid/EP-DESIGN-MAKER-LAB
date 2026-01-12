
import React, { useState } from 'react';
import { Lesson, Difficulty } from '../types';
import { LESSONS } from '../constants';

interface LessonPathDetailProps {
  currentLevelIndex: number;
  onNext: () => void;
  onExit: () => void;
}

const LessonPathDetail: React.FC<LessonPathDetailProps> = ({ currentLevelIndex, onNext, onExit }) => {
  const lesson = LESSONS[currentLevelIndex];
  const [activeStep, setActiveStep] = useState(0);

  if (!lesson) return null;

  const isLastLevel = currentLevelIndex === LESSONS.length - 1;

  // Mock hardware list for the new section
  const hardwareComponents = [
    { name: 'micro:bit v2', quantity: 1, icon: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=100' },
    { name: 'ELECFREAKS Micro:bit Breakout Board', quantity: 1 },
    { name: '2.42in OLED SSD1309 Display', quantity: 1 },
    { name: '0.96in OLED SSD1306 Display', quantity: 1 },
    { name: 'Jumper wires (generic)', quantity: 1, icon: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=100' },
    { name: 'USB-A to Mini-USB Cable', quantity: 1, icon: 'https://images.unsplash.com/photo-1589149098258-3e9102ca93d3?auto=format&fit=crop&q=80&w=100' }
  ];

  return (
    <div className="flex flex-col h-full bg-[#fcfcfd] text-slate-800 min-h-[700px]">
      {/* Top Professional Header - Sticky */}
      <div className="bg-white border-b border-slate-200/60 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-6">
          <button 
            onClick={onExit} 
            className="w-10 h-10 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-center transition-all text-slate-400 hover:text-slate-900 shadow-sm"
            title="Exit Course"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-black uppercase tracking-widest">PRO PATH</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">3D Printing Specialization</span>
            </div>
            <h2 className="text-sm font-black text-slate-900">Current Level: {lesson.difficulty}</h2>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Path Progress</span>
            <span className="text-xs font-black text-slate-900">{Math.round(((currentLevelIndex + 1) / LESSONS.length) * 100)}% Complete</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-full">
            {LESSONS.map((_, i) => (
              <div 
                key={i} 
                className={`h-2.5 w-10 rounded-full transition-all duration-500 ${
                  i <= currentLevelIndex ? 'bg-purple-600 shadow-sm' : 'bg-slate-300'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-72 border-r border-slate-200/60 bg-white hidden lg:flex flex-col p-6 overflow-y-auto shrink-0">
          <h3 className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em] mb-6 px-2">Course Storyboard</h3>
          <ul className="space-y-2">
            {lesson.storySteps?.map((step, i) => (
              <li key={i}>
                <button 
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left p-3.5 rounded-2xl text-[13px] font-bold flex items-center gap-4 transition-all group border-2 ${
                    activeStep === i 
                      ? 'bg-purple-50 border-purple-500 text-purple-900 shadow-md shadow-purple-100' 
                      : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    activeStep === i ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                  }`}>
                    <i className={`fa-solid ${step.icon} text-[12px]`}></i>
                  </div>
                  <span className="truncate">{step.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-[#fcfcfd] scroll-smooth custom-scrollbar">
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-10 space-y-12 pb-32">
            
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                {lesson.title}
              </h1>
            </div>

            {/* Things used in this project - LIGHT MODE THEME */}
            <div className="bg-white text-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/40 border border-slate-100 space-y-8">
              <h2 className="text-2xl font-black">Things used in this project</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
                    <i className="fa-solid fa-microchip text-indigo-500"></i> Hardware components
                  </h3>
                  <div className="divide-y divide-slate-100 border-t border-slate-100">
                    {hardwareComponents.map((item, i) => (
                      <div key={i} className="py-5 flex items-center justify-between group">
                        <div className="flex items-center gap-5">
                          {item.icon ? (
                            <img src={item.icon} className="w-12 h-12 rounded-xl bg-slate-50 object-cover border border-slate-200" alt="" />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-300">
                              <i className="fa-solid fa-cube text-sm"></i>
                            </div>
                          )}
                          <span className="text-sm font-bold text-slate-700">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-8">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">× {item.quantity}</span>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm">
                              <i className="fa-solid fa-shopping-cart text-[11px]"></i>
                            </button>
                            <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm">
                              <i className="fa-solid fa-chevron-down text-[11px] text-slate-400"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
                    <i className="fa-solid fa-globe text-indigo-500"></i> Software apps and online services
                  </h3>
                  <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all cursor-pointer group">
                    <img src="https://microblocks.fun/img/icon.png" className="w-12 h-12 rounded-xl shadow-sm border border-white" alt="MicroBlocks" />
                    <div>
                      <span className="text-sm font-black text-indigo-600 group-hover:underline">MicroBlocks</span>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Visual Programming</p>
                    </div>
                    <i className="fa-solid fa-arrow-up-right-from-square ml-auto text-slate-300 group-hover:text-indigo-500 text-xs"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Story Card */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200/60 shadow-xl shadow-slate-200/20 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-purple-600"></div>
              
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-100">
                  <i className={`fa-solid ${lesson.storySteps?.[activeStep]?.icon} text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 leading-none mb-1">{lesson.storySteps?.[activeStep]?.title}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Section {activeStep + 1} of {lesson.storySteps?.length}</p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium mb-8">
                  {lesson.storySteps?.[activeStep]?.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Fixed Navigation Bar */}
      <div className="h-24 bg-white border-t border-slate-200/60 px-8 flex items-center justify-between sticky bottom-0 z-40 backdrop-blur-md bg-white/90">
        <div className="flex items-center gap-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${
            lesson.difficulty === Difficulty.BEGINNER ? 'bg-emerald-100 text-emerald-700' : 
            lesson.difficulty === Difficulty.INTERMEDIATE ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
          }`}>
            {currentLevelIndex + 1}
          </div>
          <div className="hidden sm:block">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Current Active Lesson</p>
            <p className="text-sm font-black text-slate-900 truncate max-w-[200px]">{lesson.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onExit}
            className="px-5 py-3 rounded-xl text-[11px] font-black text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all uppercase tracking-widest"
          >
            Quit
          </button>
          {!isLastLevel ? (
            <button 
              onClick={onNext}
              className="px-8 py-3.5 bg-purple-600 text-white rounded-2xl text-[12px] font-black hover:bg-purple-700 shadow-xl shadow-purple-200 active:scale-95 transition-all flex items-center gap-3 uppercase tracking-[0.1em]"
            >
              Next Level
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          ) : (
            <button 
              onClick={onExit}
              className="px-8 py-3.5 bg-emerald-600 text-white rounded-2xl text-[12px] font-black hover:bg-emerald-700 shadow-xl shadow-emerald-200 active:scale-95 transition-all flex items-center gap-3 uppercase tracking-[0.1em]"
            >
              Finish Path
              <i className="fa-solid fa-graduation-cap text-[10px]"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPathDetail;
