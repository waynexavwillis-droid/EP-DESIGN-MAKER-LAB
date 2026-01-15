
import React, { useState, useEffect } from 'react';
import { Project, LessonStep, Difficulty } from '../types';
import { getAIAssistantResponse } from '../services/geminiService';

interface ProjectCreationModalProps {
  onClose: () => void;
  onSubmit: (project: Project) => void;
}

const ProjectCreationModal: React.FC<ProjectCreationModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    student: '',
    grade: Difficulty.BEGINNER,
    category: '3D Printing Mastery',
    description: '',
    fullDescription: '',
    imageUrl: ''
  });
  
  const [steps, setSteps] = useState<LessonStep[]>([
    { title: 'Planning', content: 'Describe how you planned your design.', icon: 'fa-pencil' }
  ]);
  
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [imageValid, setImageValid] = useState(false);

  useEffect(() => {
    if (formData.imageUrl) {
      const img = new Image();
      img.src = formData.imageUrl;
      img.onload = () => setImageValid(true);
      img.onerror = () => setImageValid(false);
    } else {
      setImageValid(false);
    }
  }, [formData.imageUrl]);

  const handleAIHelp = async () => {
    if (!formData.title) return;
    setIsGeneratingAI(true);
    const context = `A student project titled "${formData.title}" in the category "${formData.category}".`;
    const prompt = `Write a creative and encouraging 2-sentence description for this project.`;
    const aiText = await getAIAssistantResponse(prompt, context);
    setFormData(prev => ({ ...prev, description: aiText || prev.description }));
    setIsGeneratingAI(false);
  };

  const addStep = () => {
    setSteps([...steps, { title: 'New Step', content: 'What did you do next?', icon: 'fa-cube' }]);
  };

  const updateStep = (index: number, field: keyof LessonStep, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    if (!formData.title || !formData.student) {
      alert("Please enter a title and name.");
      return;
    }

    const newProject: Project = {
      id: `p-custom-${Date.now()}`,
      ...formData,
      likes: 0,
      steps: steps,
      materials: [] // Can be extended later
    };
    onSubmit(newProject);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col relative animate-in zoom-in-95 duration-300 border border-white/20">
        
        {/* Header */}
        <div className="px-10 py-6 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Publish New Project</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Share your creation with the community</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-900 transition-all flex items-center justify-center">
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-10 flex flex-col lg:flex-row gap-12 custom-scrollbar">
          
          {/* Left Side: Form */}
          <div className="flex-1 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 text-xs">Project Title</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Solar Powered Rover"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 text-xs">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold appearance-none cursor-pointer"
                >
                  <option>3D Printing Mastery</option>
                  <option>Building Structures</option>
                  <option>Microcontrollers</option>
                  <option>Craft & Art</option>
                  <option>Robotics</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 text-xs">Created by</label>
                <input 
                  type="text" 
                  value={formData.student} 
                  onChange={(e) => setFormData({...formData, student: e.target.value})}
                  placeholder="Your Full Name"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 text-xs">Complexity Level</label>
                <select 
                  value={formData.grade}
                  onChange={(e) => setFormData({...formData, grade: e.target.value as Difficulty})}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold appearance-none cursor-pointer"
                >
                  <option value={Difficulty.BEGINNER}>Beginner</option>
                  <option value={Difficulty.INTERMEDIATE}>Intermediate</option>
                  <option value={Difficulty.HARD}>Hard</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-xs">Description</label>
                <button 
                  onClick={handleAIHelp}
                  disabled={isGeneratingAI || !formData.title}
                  className="text-[10px] font-black text-indigo-500 hover:text-indigo-600 uppercase tracking-widest flex items-center gap-1.5 transition-colors disabled:opacity-30"
                >
                  {isGeneratingAI ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
                  AI Assist
                </button>
              </div>
              <textarea 
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="A short hook for your project..."
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium resize-none"
              ></textarea>
            </div>

            {/* Steps Builder */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-lg font-black text-slate-900">Build Process Documentation</h3>
                <button 
                  onClick={addStep}
                  className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-all shadow-lg"
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
              </div>
              
              <div className="space-y-4">
                {steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 relative group/step">
                    <button 
                      onClick={() => removeStep(idx)}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-rose-500 border border-slate-100 opacity-0 group-hover/step:opacity-100 transition-opacity shadow-sm flex items-center justify-center hover:bg-rose-500 hover:text-white"
                    >
                      <i className="fa-solid fa-minus text-[10px]"></i>
                    </button>
                    <div className="flex gap-4">
                       <div className="w-14 h-14 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400">
                         <i className={`fa-solid ${step.icon} text-xl`}></i>
                       </div>
                       <div className="flex-1 space-y-4">
                          <input 
                            type="text" 
                            value={step.title}
                            onChange={(e) => updateStep(idx, 'title', e.target.value)}
                            className="w-full bg-transparent font-black text-slate-900 focus:outline-none border-b border-transparent focus:border-indigo-200"
                            placeholder="Step Title"
                          />
                          <textarea 
                            value={step.content}
                            onChange={(e) => updateStep(idx, 'content', e.target.value)}
                            className="w-full bg-transparent text-sm text-slate-500 focus:outline-none min-h-[60px]"
                            placeholder="Describe what you did in this step..."
                          ></textarea>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Media & Summary */}
          <div className="lg:w-80 shrink-0 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 text-xs">Project Thumbnail URL</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="Paste Unsplash or image link..."
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-[11px] font-bold"
                />
              </div>

              {/* Preview Box */}
              <div className="aspect-[4/3] bg-slate-100 rounded-[2rem] border-2 border-dashed border-slate-200 overflow-hidden flex flex-col items-center justify-center relative">
                {imageValid ? (
                  <img src={formData.imageUrl} className="w-full h-full object-cover animate-in fade-in duration-700" alt="Preview" />
                ) : (
                  <div className="text-center px-6">
                    <i className="fa-solid fa-image text-3xl text-slate-300 mb-2"></i>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Preview Area</p>
                    <p className="text-[9px] text-slate-300 mt-1">Paste a valid URL to see your project cover</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-indigo-50 rounded-[2rem] p-6 space-y-4 border border-indigo-100">
              <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest border-b border-indigo-200 pb-2">Publication Note</h4>
              <p className="text-[11px] text-indigo-700 font-medium leading-relaxed">
                By publishing, your project will be visible to all members of the Design Maker Lab. Make sure to document your steps carefully so others can learn from your innovation!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <button 
            onClick={onClose}
            className="px-8 py-4 text-slate-500 font-black text-xs uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handlePublish}
            className="px-10 py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            Publish Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreationModal;
