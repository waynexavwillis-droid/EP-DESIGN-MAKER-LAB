
import React from 'react';
import { Lesson, Difficulty } from '../types';

interface LessonCardProps {
  lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  const getDifficultyStyles = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.BEGINNER: return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case Difficulty.INTERMEDIATE: return 'bg-amber-50 text-amber-700 border-amber-100';
      case Difficulty.HARD: return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-300">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={lesson.imageUrl} 
          alt={lesson.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyStyles(lesson.difficulty)}`}>
            {lesson.difficulty}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 px-3 py-1 glass-morphism rounded-lg text-xs font-semibold text-slate-800">
          <i className="fa-regular fa-clock mr-1 text-indigo-500"></i> {lesson.duration}
        </div>
      </div>
      
      <div className="p-6 space-y-3">
        <div className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
          {lesson.category}
        </div>
        <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
          {lesson.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2">
          {lesson.description}
        </p>
        
        <div className="pt-4 flex items-center justify-between border-t border-slate-50">
          <button className="text-sm font-bold text-slate-900 flex items-center gap-1 group/btn">
            View Syllabus 
            <i className="fa-solid fa-arrow-right text-[10px] transition-transform group-hover/btn:translate-x-1"></i>
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <i className="fa-solid fa-plus text-xs"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
