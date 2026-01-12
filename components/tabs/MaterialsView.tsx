
import React, { useState } from 'react';
import { MATERIALS } from '../../constants';
import { Material } from '../../types';

const MaterialsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedInterests, setSavedInterests] = useState<string[]>([]); // Array of material IDs

  const categories = ['All Products', '3D Printer', 'Coding', 'Accessories', 'Filament', 'Robotics'];

  const filteredMaterials = MATERIALS.filter(item => {
    const matchesCategory = activeCategory === 'All Products' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (savedInterests.includes(id)) {
      setSavedInterests(savedInterests.filter(i => i !== id));
    } else {
      setSavedInterests([...savedInterests, id]);
    }
  };

  return (
    <div className="flex flex-col gap-8 bg-white -m-8 md:-m-12 p-8 md:p-12 font-sans min-h-screen">
      {/* Top Professional Header */}
      <header className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-slate-900 text-3xl font-black tracking-tight">Project Toolkit</h1>
            <span className="text-slate-400 text-sm mt-1">Browse and customize your lab equipment list</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white border border-slate-200 px-5 py-2.5 rounded-full shadow-sm">
               <div className="relative">
                 <i className="fa-solid fa-folder-open text-blue-600"></i>
                 <span className="absolute -top-3 -right-3 bg-blue-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white">
                   {savedInterests.length}
                 </span>
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">My Saved Interests</span>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-full max-w-4xl mx-auto md:mx-0">
          <input 
            type="text" 
            placeholder="Search catalog... find a product, tool, or material" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f8f9fb] border border-slate-200 rounded-2xl px-6 py-4 text-sm text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-300"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-r pr-3 border-slate-200">{filteredMaterials.length} Results</span>
            <i className="fa-solid fa-magnifying-glass text-blue-500 text-sm"></i>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12 pt-4">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-12">
          {/* Categories Section */}
          <section>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6 border-b pb-2">Categories</h3>
            <ul className="space-y-4">
              {categories.map(cat => (
                <li 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[13px] font-bold cursor-pointer transition-all flex items-center gap-3 ${
                    activeCategory === cat ? 'text-blue-600' : 'text-slate-400 hover:text-slate-800'
                  }`}
                >
                  <div className={`w-1 h-1 rounded-full transition-colors ${activeCategory === cat ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                  {cat}
                </li>
              ))}
            </ul>
          </section>

          {/* Simple Info Section */}
          <section className="pt-6">
            <div className="text-slate-400 text-[11px] leading-relaxed">
              3023 UBI Road 3,<br />
              #02-08/#02-09,<br />
              Singapore, 408663
            </div>
          </section>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
            {filteredMaterials.map(item => (
              <div key={item.id} className="group flex flex-col gap-5">
                {/* Image Container */}
                <div 
                  className="relative aspect-square bg-white border border-slate-100 rounded-[2.5rem] p-10 flex items-center justify-center cursor-pointer hover:shadow-2xl transition-all duration-500"
                  onClick={() => handleProductClick(item.externalUrl)}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Floating Like/Interest Button */}
                  <button 
                    onClick={(e) => toggleLike(e, item.id)}
                    className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center border transition-all shadow-md active:scale-90 ${
                      savedInterests.includes(item.id)
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-slate-100 text-slate-300 hover:text-blue-600'
                    }`}
                  >
                    <i className={`fa-solid fa-heart ${savedInterests.includes(item.id) ? 'animate-pulse' : ''}`}></i>
                  </button>

                  {/* Visit Store Label on Hover */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[2.5rem]">
                    <div className="bg-white/90 backdrop-blur px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest text-slate-900 border border-slate-200 shadow-xl">
                      View Details
                    </div>
                  </div>
                </div>

                {/* Product Meta - Price Tag Removed */}
                <div className="flex flex-col gap-1 text-center px-4">
                  <div className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">{item.category}</div>
                  <button 
                    onClick={() => handleProductClick(item.externalUrl)}
                    className="text-[15px] font-black text-slate-900 leading-tight hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredMaterials.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-slate-300">
              <i className="fa-solid fa-search text-5xl mb-6 opacity-20"></i>
              <p className="font-bold text-slate-400">No matching items found</p>
              <p className="text-xs uppercase tracking-widest font-black mt-2">Try adjusting your filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MaterialsView;
