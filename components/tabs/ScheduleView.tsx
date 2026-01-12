
import React, { useState } from 'react';
import { WEEKLY_SCHEDULE } from '../../constants';
import { ScheduleItem } from '../../types';

const ScheduleView: React.FC = () => {
  const [selectedPreview, setSelectedPreview] = useState<ScheduleItem | null>(null);

  const activityTypes = [
    { label: 'Recess Time', icon: 'fa-box-open', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { label: 'CCA', icon: 'fa-users', color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { label: 'Workshop', icon: 'fa-wand-magic-sparkles', color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { label: 'Competition', icon: 'fa-trophy', color: 'bg-orange-50 text-orange-600 border-orange-200' },
    { label: 'Exhibition', icon: 'fa-palette', color: 'bg-pink-50 text-pink-600 border-pink-200' }
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Customer Lesson Schedule</h1>
        <p className="text-slate-500 text-sm">Daily guided lesson plans for our product owners and subscribers</p>
      </header>

      <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6">
        <div className="text-slate-800 font-bold text-sm mb-4">Support & Program Types:</div>
        <div className="flex flex-wrap gap-2">
          {activityTypes.map(type => (
            <div key={type.label} className={`px-4 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-2 border ${type.color}`}>
              <i className={`fa-solid ${type.icon}`}></i>
              {type.label === 'Recess Time' ? 'Customer Support' : type.label}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-calendar-week text-purple-500"></i>
            <h2 className="text-xl font-bold text-slate-800">Weekly Learning Path</h2>
          </div>
          <div className="text-xs font-bold text-emerald-600 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Support Active
          </div>
        </div>

        {WEEKLY_SCHEDULE.map(day => (
          <div key={day.day} className="bg-white border-2 border-slate-100 rounded-[2rem] overflow-hidden shadow-sm hover:border-purple-100 transition-colors">
            <div className="bg-purple-600 p-3 px-8 text-white font-bold text-sm uppercase tracking-widest flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>{day.day}</span>
                <span className="opacity-60 text-xs font-medium lowercase first-letter:uppercase tracking-normal">({day.date})</span>
              </div>
              <span className="text-[10px] opacity-70">Guided Daily Plan</span>
            </div>
            <div className="p-6 space-y-4">
              {day.items.map((item, idx) => {
                const typeStyle = activityTypes.find(t => t.label === item.type)?.color || '';
                return (
                  <div key={idx} className={`p-6 rounded-3xl border flex flex-col gap-3 relative hover:scale-[1.01] transition-transform ${typeStyle}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <i className={`fa-solid ${activityTypes.find(t => t.label === item.type)?.icon}`}></i>
                        {item.title}
                      </div>
                      <span className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">{item.type}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs font-medium">
                      <span className="flex items-center gap-1.5"><i className="fa-solid fa-clock opacity-60"></i> {item.time}</span>
                      <span className="flex items-center gap-1.5"><i className="fa-solid fa-tags opacity-60"></i> {item.audience}</span>
                    </div>
                    <p className="text-xs opacity-80 leading-relaxed font-medium max-w-2xl">
                      {item.description}
                    </p>
                    <div className="absolute right-6 bottom-6 flex gap-2">
                      <button className="p-2 rounded-lg bg-white/50 hover:bg-white transition-colors border border-black/5">
                        <i className="fa-solid fa-download text-[10px]"></i>
                      </button>
                      <button 
                        onClick={() => setSelectedPreview(item)}
                        className="px-6 py-2 rounded-xl bg-white text-slate-800 font-bold text-[10px] shadow-sm hover:shadow-md transition-all border border-slate-100"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedPreview(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center transition-all"
            >
              <i className="fa-solid fa-times"></i>
            </button>

            {/* Big Image Section */}
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={selectedPreview.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200'} 
                className="w-full h-full object-cover" 
                alt={selectedPreview.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <div className="px-3 py-1 bg-purple-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                  {selectedPreview.type}
                </div>
                <h2 className="text-3xl font-bold text-white leading-tight">{selectedPreview.title}</h2>
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[70vh] md:max-h-none flex flex-col">
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-slate-50 px-4 py-2 rounded-2xl flex items-center gap-3">
                  <i className="fa-solid fa-clock text-purple-500"></i>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Time Slot</p>
                    <p className="text-xs font-bold text-slate-800">{selectedPreview.time}</p>
                  </div>
                </div>
                <div className="bg-slate-50 px-4 py-2 rounded-2xl flex items-center gap-3">
                  <i className="fa-solid fa-user-graduate text-purple-500"></i>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Instructor</p>
                    <p className="text-xs font-bold text-slate-800">{selectedPreview.instructor || 'Staff'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">About this course</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {selectedPreview.description}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Target Audience</h4>
                  <p className="text-slate-800 text-sm font-bold">{selectedPreview.audience}</p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-[10px] text-slate-400 italic mb-6 leading-relaxed">
                    * This lesson plan is specially designed for customers of our physical maker kits. High-definition instructional videos and downloadable project assets are included.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                {/* Book This Session button removed as per user request */}
                <button 
                  onClick={() => setSelectedPreview(null)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 active:scale-95 transition-all"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleView;
