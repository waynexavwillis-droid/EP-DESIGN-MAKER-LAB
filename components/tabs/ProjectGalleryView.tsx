
import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../../constants';

const ProjectGalleryView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const filters = ['All Projects', 'Building Structures', 'Microcontrollers', 'Craft & Art', 'Robotics'];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesCategory = activeFilter === 'All Projects' || project.category === activeFilter;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.student.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Project Gallery</h1>
          <p className="text-slate-500 text-sm">Showcasing amazing creations from our young makers</p>
        </div>
        
        <div className="relative max-w-sm w-full">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          <input 
            type="text" 
            placeholder="Search projects or students..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === f 
                ? 'bg-purple-600 text-white' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                {project.award && (
                  <div className="absolute top-4 right-4 bg-amber-400 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-lg">
                    <i className="fa-solid fa-medal"></i>
                    {project.award}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-1">{project.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase mb-4">
                  <i className="fa-solid fa-user-circle"></i>
                  {project.student} | {project.grade}
                </div>
                <div className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[10px] font-bold inline-block mb-4">
                  {project.category}
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-8">
                  {project.description}
                </p>
                
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <button className="flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                      <i className="fa-solid fa-heart text-xs"></i>
                    </div>
                    <span className="text-xs font-bold">{project.likes}</span>
                  </button>
                  <button className="text-[10px] font-bold text-slate-400 hover:text-purple-600 transition-all">
                    Tap to appreciate!
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400 border-2 border-dashed border-slate-100 rounded-[2rem]">
          <i className="fa-solid fa-folder-open text-4xl mb-4 opacity-20"></i>
          <p className="font-bold">No projects found</p>
          <p className="text-sm">Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  );
};

export default ProjectGalleryView;
