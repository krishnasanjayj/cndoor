import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Building2, ChevronRight } from 'lucide-react';
import heroBg from '../assets/hero-bg.jpg';
import loginBg from '../assets/loginpg.jpg';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';

export default function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true); // Default to login mode

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, register, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isLoginMode) {
        // Since we removed role toggle, all new signups are regular clients
        const user = await register(name, mobile, email, password, 'client');
        navigate('/client', { replace: true });
        return;
      }

      const user = await login(email, password);
      navigate(user.role === 'owner' ? '/owner' : '/client', { replace: true });
    } catch (_) {}
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const mMail = result.user.email;
      const mName = result.user.displayName || 'Google User';

      const safeUser = {
        id: result.user.uid,
        name: mName,
        email: mMail,
        role: 'client',
        avatar: mName.charAt(0).toUpperCase()
      };
      
      localStorage.setItem('upvc_user', JSON.stringify(safeUser));
      window.location.href = '/client';

    } catch (err) {
      console.error("Google Sign-In Error", err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(`Google sign-in failed: ${err.message}`);
      }
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden p-6"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for the full page background */}
      <div className="absolute inset-0 bg-[#0a0e1a]/80 backdrop-blur-[4px] z-0"></div>

      {/* Background orbs */}
      <div className="absolute rounded-full blur-[80px] pointer-events-none z-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,transparent_70%)] -top-[200px] -left-[200px]" />
      <div className="absolute rounded-full blur-[80px] pointer-events-none z-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] -bottom-[150px] -right-[100px]" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-[960px] w-full bg-bgCard border border-borderBase rounded-xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)] relative z-10 animate-fade-in">
        {/* Left Panel */}
        <div className="bg-gradient-to-br from-[#94acee] to-[#68ddbc] py-10 px-8 md:py-14 md:px-12 flex flex-col justify-center relative overflow-hidden border-r border-borderBase before:content-[''] before:absolute before:-top-[100px] before:-right-[100px] before:w-[400px] before:h-[400px] before:bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] before:pointer-events-none">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-gold to-goldDark rounded-md flex items-center justify-center text-[#0a0e1a] shrink-0">
              <Building2 size={28} />
            </div>
            <span className="font-heading text-[1.15rem] font-bold text-textPrimary tracking-[0.02em]">CN Doors</span>
          </div>
          <h1 className="font-heading text-[1.8rem] md:text-[2.4rem] font-extrabold leading-[1.15] text-textPrimary mb-5">
            Premium Doors<br />& Windows<br />
            <span className="text-[#1e3a8a] drop-shadow-sm">Crafted for Life</span>
          </h1>
          <p className="text-slate-800 font-medium text-[0.95rem] leading-[1.7] mb-9">
            Experience the finest UPVC door and window solutions — energy efficient, secure, and elegantly designed.
          </p>
          <div className="flex flex-col gap-3">
            {[ '10-Year Warranty', 'Free Site Survey', 'Expert Installation'].map(f => (
              <div key={f} className="flex items-center gap-2.5 text-[0.95rem] font-semibold text-slate-800">
                <ChevronRight size={16} className="text-[#1e3a8a] stroke-[3]" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div 
          className="py-10 px-8 md:py-14 md:px-12 flex items-center justify-center relative overflow-hidden bg-bgCard"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay to ensure legibility of the form while letting image shine through */}
          <div className="absolute inset-0 bg-[#121a2e]/80 backdrop-blur-[6px] z-0"></div>
          
          <div className="w-full max-w-[380px] relative z-10">
            <div className="mb-8" key={isLoginMode ? 'signIn' : 'signUp'}>
              <h2 className="font-heading text-[1.8rem] font-bold text-textPrimary mb-1.5 animate-fade-in">{isLoginMode ? 'Welcome Back' : 'Create an Account'}</h2>
              <p className="text-textMuted text-[0.9rem] animate-fade-in-delayed">{isLoginMode ? 'Sign in to your account' : 'Sign up to request quotes & track orders'}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5" autoComplete="off">
              {error && (
                <div className="bg-error/10 border border-error/25 rounded-md py-3 px-4 text-[0.85rem] text-error animate-fade-in">
                  {error}
                </div>
              )}

              <div 
                className={`transition-all duration-500 ease-in-out flex flex-col overflow-hidden origin-top ${
                  isLoginMode ? 'max-h-0 opacity-0 -mb-5 pointer-events-none scale-y-95' : 'max-h-[300px] opacity-100 gap-5 scale-y-100'
                }`}
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.85rem] font-medium text-textSecondary tracking-[0.02em]">Full Name</label>
                  <input type="text" className="bg-white/5 border-[1.5px] border-borderBase rounded-md text-textPrimary py-3 px-4 text-[0.9rem] transition-colors w-full focus:border-gold focus:bg-gold/5 focus:ring-[3px] focus:ring-gold/10 outline-none placeholder:text-textMuted" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required={!isLoginMode} autoComplete="off" tabIndex={isLoginMode ? -1 : 0} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.85rem] font-medium text-textSecondary tracking-[0.02em]">Mobile Number</label>
                  <div className="flex bg-white/5 border-[1.5px] border-borderBase rounded-md focus-within:border-gold focus-within:bg-gold/5 focus-within:ring-[3px] focus-within:ring-gold/10 transition-colors overflow-hidden">
                    <span className="flex items-center justify-center px-4 border-r border-borderBase text-textSecondary text-[0.95rem] font-medium bg-black/20 select-none">
                      +91
                    </span>
                    <input type="tel" id="login-mobile" className="w-full bg-transparent text-textPrimary py-3 px-3 text-[0.9rem] outline-none placeholder:text-textMuted" placeholder="9xxxxxxxxx" maxLength={10} value={mobile} onChange={e => setMobile(e.target.value.replace(/[^0-9]/g, ''))} required={!isLoginMode} autoComplete="off" tabIndex={isLoginMode ? -1 : 0} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.85rem] font-medium text-textSecondary tracking-[0.02em]">Email Address</label>
                <input type="email" className="bg-white/5 border-[1.5px] border-borderBase rounded-md text-textPrimary py-3 px-4 text-[0.9rem] transition-colors w-full focus:border-gold focus:bg-gold/5 focus:ring-[3px] focus:ring-gold/10 outline-none placeholder:text-textMuted" placeholder="client@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required id="login-email" autoComplete="off" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.85rem] font-medium text-textSecondary tracking-[0.02em]">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} className="bg-white/5 border-[1.5px] border-borderBase rounded-md text-textPrimary py-3 pl-4 pr-11 text-[0.9rem] transition-colors w-full focus:border-gold focus:bg-gold/5 focus:ring-[3px] focus:ring-gold/10 outline-none placeholder:text-textMuted" placeholder={!isLoginMode ? 'Create a password' : 'Enter your password'} value={password} onChange={e => setPassword(e.target.value)} required id="login-password" autoComplete="new-password" />
                  <button type="button" className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-textMuted flex items-center transition-colors hover:text-gold" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="mt-1 flex justify-center items-center gap-2 py-3.5 px-6 rounded-md text-[0.95rem] font-semibold transition-all duration-300 w-full cursor-pointer bg-gradient-to-br from-gold to-goldDark text-[#0a0e1a] hover:from-goldLight hover:to-gold hover:-translate-y-[2px] shadow-[0_4px_14px_rgba(212,175,55,0.2)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transform-gpu" disabled={loading} id="login-submit-btn">
                {loading ? (
                  <><div className="w-[18px] h-[18px] border-2 border-borderBase border-t-gold rounded-full animate-spin-slow" /> Processing...</>
                ) : (
                  <span className="flex items-center gap-2 animate-fade-in" key={isLoginMode ? 'btn-in' : 'btn-up'}>
                    {isLoginMode ? 'Sign In' : 'Sign Up'} <ChevronRight size={16} />
                  </span>
                )}
              </button>

              <div className="flex items-center text-center text-textMuted text-[0.8rem] my-2 before:flex-1 before:border-b before:border-borderBase after:flex-1 after:border-b after:border-borderBase [&>span]:px-3">
                <span>Or continue with</span>
              </div>

              <div className="flex justify-center flex-col w-full">
                <button type="button" className="flex justify-center items-center gap-2 text-[0.9rem] font-medium text-textPrimary bg-transparent border-[1.5px] border-borderBase rounded-md py-3.5 px-4 transition-all hover:bg-white/5 hover:border-borderAccent hover:-translate-y-[2px]" onClick={handleGoogleSignIn}>
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" height="20" />
                  Continue with Google
                </button>
              </div>

            </form>

            <div className="mt-5 text-center text-[0.9rem] text-slate-500 animate-fade-in">
              {isLoginMode ? "Don't have an account? " : "If you already have an account? "}
              <button onClick={() => setIsLoginMode(!isLoginMode)} className="text-gold font-bold underline bg-none border-none cursor-pointer p-0 hover:text-goldLight transition-colors duration-300 relative inline-flex overflow-hidden">
                <span className="animate-fade-in" key={isLoginMode ? 'toggle-up' : 'toggle-in'}>
                  {isLoginMode ? 'Sign up' : 'Sign in'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
