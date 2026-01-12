
import React, { useState } from 'react';
import { Difficulty } from '../types';
import { LESSONS } from '../constants';
import LessonCard from './LessonCard';

const LessonSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Difficulty | 'All'>('All');

  const filteredLessons = activeFilter === 'All' 
    ? LESSONS 
    : LESSONS.filter(l => l.difficulty === activeFilter);

  return (
    <section id="lessons" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Master Your <span className="text-indigo-600">Craft</span>
            </h2>
            <p className="text-slate-500 max-w-xl">
              From absolute beginners picking up a soldering iron for the first time to advanced engineers building complex robotic systems.
            </p>
          </div>
          
          <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl overflow-x-auto scrollbar-hide">
            {['All', Difficulty.BEGINNER, Difficulty.INTERMEDIATE, Difficulty.HARD].map((diff) => (
              <button
                key={diff}
                onClick={() => setActiveFilter(diff as any)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  activeFilter === diff 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-indigo-600 rounded-3xl relative overflow-hidden text-white flex flex-col md:flex-row items-center gap-8 md:justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="space-y-2 relative z-10">
            <h3 className="text-2xl font-bold">Unsure where to start?</h3>
            <p className="text-indigo-100 opacity-80">Take our 2-minute skill assessment to find your ideal path.</p>
          </div>
          <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all active:scale-95 shadow-xl relative z-10">
            Start Assessment
          </button>
        </div>
      </div>
    </section>
  );
};

export default LessonSection;
