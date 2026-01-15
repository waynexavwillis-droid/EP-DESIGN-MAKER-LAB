
import React, { useState } from 'react';
import { signInWithGoogle } from '../services/firebase';

interface LoginScreenProps {
  onAuthSuccess: (user: any) => void;
  error?: string | null;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ error: externalError }) => {
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setLocalError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setLocalError("Google sign-in failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const displayError = externalError || localError;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:30px_30px]"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="glass-morphism bg-white/5 backdrop-blur-2xl rounded-[3rem] p-10 md:p-14 border border-white/10 shadow-2xl relative text-center">
          <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-3xl shadow-2xl shadow-indigo-500/50 mb-8 mx-auto transform -rotate-6">
            <i className="fa-solid fa-flask-vial"></i>
          </div>

          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Design Maker Lab</h1>
          <p className="text-slate-400 text-sm font-medium mb-10 tracking-wide uppercase">Authorized Access Required</p>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-white text-slate-900 h-16 rounded-2xl flex items-center justify-center gap-4 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-100 active:scale-[0.98] transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? (
              <i className="fa-solid fa-spinner animate-spin text-indigo-600 text-xl"></i>
            ) : (
              <>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-6 h-6" alt="Google" />
                Sign In with Google
              </>
            )}
          </button>

          <div className="mt-8 p-5 bg-white/5 rounded-2xl border border-white/5 text-left">
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <i className="fa-solid fa-shield-halved"></i>
              <span className="text-[10px] font-black uppercase tracking-widest">Lab Security</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
              Entrance is restricted to emails registered in the Firebase console. If you are a new student, please request access from the Lab Instructor.
            </p>
          </div>

          {displayError && (
            <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-[11px] text-rose-400 font-bold">{displayError}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
