
import React, { useState } from 'react';
import { LESSONS } from '../../constants';
import { Difficulty } from '../../types';

interface LabLayoutViewProps {
  onEnroll: () => void;
}

const LabLayoutView: React.FC<LabLayoutViewProps> = ({ onEnroll }) => {
  const [enrollStatus, setEnrollStatus] = useState<'idle' | 'processing' | 'enrolled'>('idle');

  const handleEnrollClick = () => {
    setEnrollStatus('processing');
    setTimeout(() => {
      setEnrollStatus('enrolled');
      // After showing the success state for a moment, trigger the pathway view
      setTimeout(() => {
        onEnroll();
        setEnrollStatus('idle');
      }, 1000);
    }, 1500);
  };

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.BEGINNER: return 'text-emerald-500 bg-emerald-50';
      case Difficulty.INTERMEDIATE: return 'text-amber-500 bg-amber-50';
      case Difficulty.HARD: return 'text-rose-500 bg-rose-50';
      default: return 'text-slate-500 bg-slate-50';
    }
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Maker Lab Floor Plan</h1>
        <p className="text-slate-500 text-sm">Click on any zone to see materials and details</p>
      </header>

      <div className="bg-slate-100/50 rounded-[2rem] p-6 border border-slate-200/60 relative">
        <div className="flex flex-wrap items-center gap-2 mb-6 text-[10px] font-bold uppercase tracking-wider">
          <span className="text-slate-400 mr-4">Primary School Maker Space Floor Plan</span>
          <span className="bg-purple-600 text-white px-2 py-0.5 rounded">Activity Zones</span>
          <span className="bg-emerald-500 text-white px-2 py-0.5 rounded flex items-center gap-1">
            <i className="fa-solid fa-arrow-down"></i> Entrance
          </span>
          <span className="bg-blue-500 text-white px-2 py-0.5 rounded">Collaborative Seating</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Grid: Activity Zones */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-video bg-pink-400 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg cursor-pointer hover:scale-[1.02] transition-transform">
              <i className="fa-solid fa-hammer text-3xl mb-2"></i>
              <span className="font-bold text-sm">Craft & Play Zone</span>
            </div>
            <div className="aspect-video bg-orange-400 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg cursor-pointer hover:scale-[1.02] transition-transform">
              <i className="fa-solid fa-cube text-3xl mb-2"></i>
              <span className="font-bold text-sm">Building Zone</span>
            </div>
            <div className="aspect-video bg-blue-400 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg cursor-pointer hover:scale-[1.02] transition-transform">
              <i className="fa-solid fa-code text-3xl mb-2"></i>
              <span className="font-bold text-sm">Coding Corner</span>
            </div>
            <div className="aspect-video bg-emerald-400 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg cursor-pointer hover:scale-[1.02] transition-transform">
              <i className="fa-solid fa-microchip text-3xl mb-2"></i>
              <span className="font-bold text-sm">Robotics Lab</span>
            </div>
            <div className="aspect-video bg-purple-400 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg cursor-pointer hover:scale-[1.02] transition-transform">
              <i className="fa-solid fa-print text-3xl mb-2"></i>
              <span className="font-bold text-sm">Digital Fabrication</span>
            </div>
            <div className="aspect-video bg-amber-400 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg cursor-pointer hover:scale-[1.02] transition-transform">
              <i className="fa-solid fa-lightbulb text-3xl mb-2"></i>
              <span className="font-bold text-sm">Display & Inspiration</span>
            </div>
          </div>

          {/* Right Panel: Collaborative Seating */}
          <div className="bg-white/80 rounded-3xl border-2 border-blue-200 p-8 flex flex-col items-center">
            <div className="flex flex-col items-center mb-8">
              <i className="fa-solid fa-couch text-4xl text-blue-500 mb-3"></i>
              <h3 className="text-xl font-bold text-slate-800">Flexible Work Tables</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3 w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <div key={num} className="bg-white border border-blue-100 rounded-xl p-3 flex flex-col items-center shadow-sm">
                  <span className="text-blue-500 text-[10px] flex items-center gap-1 font-bold mb-1">
                    <i className="fa-solid fa-cubes"></i> Table {num}
                  </span>
                  <span className="text-slate-400 text-[9px] font-bold">Seats 4-6</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-[10px] text-blue-400 font-medium leading-relaxed max-w-xs">
                All tables are movable and can be reconfigured for group work, individual projects, or larger collaborative activities.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-800">Featured Mastery Pathway</h2>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">3D Printing Specialization</p>
          </div>
          <button 
            onClick={handleEnrollClick}
            disabled={enrollStatus !== 'idle'}
            className={`px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-lg min-w-[140px] flex items-center justify-center gap-2 ${
              enrollStatus === 'enrolled' 
                ? 'bg-emerald-500 text-white shadow-emerald-100' 
                : enrollStatus === 'processing'
                ? 'bg-slate-400 text-white cursor-wait'
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200'
            }`}
          >
            {enrollStatus === 'idle' && 'Enroll in Path'}
            {enrollStatus === 'processing' && (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i>
                Processing...
              </>
            )}
            {enrollStatus === 'enrolled' && (
              <>
                <i className="fa-solid fa-check"></i>
                Ready
              </>
            )}
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-[40%] left-0 right-0 h-0.5 bg-slate-100 -z-0"></div>
          
          {LESSONS.map((lesson, idx) => (
            <div key={lesson.id} className="relative z-10 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-purple-200 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${getDifficultyColor(lesson.difficulty)}`}>
                  {idx + 1}
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getDifficultyColor(lesson.difficulty)}`}>
                  {lesson.difficulty}
                </span>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden mb-4 border border-slate-50">
                <img src={lesson.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={lesson.title} />
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-2">{lesson.title}</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                {lesson.description}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-bold text-purple-600">
                  <i className="fa-regular fa-clock mr-1"></i> {lesson.duration}
                </span>
                <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-purple-600 hover:text-white transition-all">
                  <i className="fa-solid fa-play text-[10px]"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {enrollStatus === 'enrolled' && (
          <div className="mt-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-900">Entering Learning Mode!</p>
              <p className="text-xs text-emerald-700">Get ready to dive deep into the 3D Printing Mastery path.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabLayoutView;
