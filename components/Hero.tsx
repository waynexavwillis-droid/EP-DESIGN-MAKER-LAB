
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-indigo-50 to-transparent opacity-50 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Next Semester Enrollment Open
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-slate-900">
              Forge Your <br />
              <span className="gradient-text italic">Creative Future</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
              Design Maker Lab is a collaborative ecosystem where engineering meets artistry. Master 3D fabrication, electronics, and digital design through hands-on structured learning.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
                Explore Lesson Plans
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold hover:bg-slate-50 transition-all active:scale-95">
                Watch Intro Video
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i} 
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    className="w-12 h-12 rounded-full border-2 border-white object-cover" 
                    alt="User" 
                  />
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold text-slate-900">500+</span> Students graduated
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-500 rounded-3xl opacity-10 blur-2xl animate-pulse"></div>
            <img 
              src="https://picsum.photos/seed/maker-hero/1200/900" 
              className="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl" 
              alt="Creative Workshop" 
            />
            <div className="absolute bottom-8 left-8 p-6 glass-morphism rounded-2xl max-w-xs shadow-xl border border-white/50">
              <p className="text-slate-800 font-medium mb-1">Upcoming Milestone</p>
              <p className="text-xs text-slate-500 mb-3">Annual Design Expo is coming up in 14 days.</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
