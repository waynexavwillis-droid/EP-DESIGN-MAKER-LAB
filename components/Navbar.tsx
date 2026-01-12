
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-3 bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold uppercase tracking-widest px-4 border-b border-white/5">
      <div className="flex items-center gap-4">
        <span className="opacity-40"><i className="fa-solid fa-cube"></i></span>
        <span>MakerLab Workspace Environment</span>
        <span className="opacity-40">/</span>
        <span className="text-indigo-400">Design Lab Alpha</span>
      </div>
    </nav>
  );
};

export default Navbar;
