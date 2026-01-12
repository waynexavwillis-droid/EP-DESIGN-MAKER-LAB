
import React, { useState } from 'react';
import { WEEKLY_SCHEDULE } from '../constants';

const ScheduleSection: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const selectedDaySchedule = WEEKLY_SCHEDULE.find(d => d.day === selectedDay);
  const filteredEvents = selectedDaySchedule ? selectedDaySchedule.items : [];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <section id="schedule" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Weekly <span className="text-indigo-600">Manifesto</span></h2>
          <p className="text-slate-500 max-w-xl mx-auto">Different challenges, every single day. Align your schedule with our lab activities.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`w-full text-left px-8 py-6 rounded-3xl font-bold text-lg transition-all flex items-center justify-between group ${
                  selectedDay === day 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' 
                    : 'bg-white text-slate-600 border border-slate-100 hover:border-indigo-200'
                }`}
              >
                {day}
                <i className={`fa-solid fa-chevron-right text-xs transition-transform ${selectedDay === day ? 'translate-x-1 opacity-100' : 'opacity-0'}`}></i>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-2xl font-bold text-slate-900">Agenda for {selectedDay}</h3>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
              </div>
            </div>

            <div className="space-y-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-3xl border border-slate-50 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="space-y-1">
                      <div className="text-indigo-600 font-bold text-sm tracking-widest uppercase">{event.time}</div>
                      <h4 className="text-xl font-bold text-slate-900">{event.title}</h4>
                      <div className="text-slate-500 flex items-center gap-2">
                        <i className="fa-solid fa-user-graduate text-xs"></i>
                        {event.instructor}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {event.lessonId && (
                        <button className="px-6 py-3 bg-white border border-indigo-100 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
                          Syllabus
                        </button>
                      )}
                      <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
                        Book Slot
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <i className="fa-solid fa-calendar-day text-5xl mb-4 opacity-20"></i>
                  <p>No formal workshops scheduled for this day.</p>
                  <p className="text-sm">Lab remains open for individual projects.</p>
                </div>
              )}
            </div>

            <div className="mt-12 p-6 border-t border-slate-100 flex items-center justify-between text-sm">
              <div className="flex items-center gap-4 text-slate-500">
                <span className="flex items-center gap-1"><i className="fa-solid fa-circle text-[6px] text-emerald-500"></i> Open Access</span>
                <span className="flex items-center gap-1"><i className="fa-solid fa-circle text-[6px] text-amber-500"></i> Filling Fast</span>
              </div>
              <button className="text-indigo-600 font-bold hover:underline">
                View Monthly Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;