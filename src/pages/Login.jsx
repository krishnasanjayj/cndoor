import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Building2, ChevronRight } from 'lucide-react';
import heroBg from '../assets/hero-bg.jpg';
import loginBg from '../assets/loginpg.jpg';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import './Login.css';

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
      className="login-container"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for the full page background */}
      <div className="login-overlay"></div>

      {/* Background orbs */}
      <div className="login-orb-top" />
      <div className="login-orb-bottom" />

      <div className="login-card">
        {/* Left Panel */}
        <div className="login-left-panel">
          <div className="login-logo-container">
            <div className="login-logo-icon">
              <Building2 size={28} />
            </div>
            <span className="login-logo-text">CN Doors</span>
          </div>
          <h1 className="login-hero-title">
            Premium Doors<br />& Windows<br />
            <span className="login-hero-subtitle">Crafted for Life</span>
          </h1>
          <p className="login-hero-desc">
            Experience the finest UPVC door and window solutions — energy efficient, secure, and elegantly designed.
          </p>
          <div className="login-feature-list">
            {[ '10-Year Warranty', 'Free Site Survey', 'Expert Installation'].map(f => (
              <div key={f} className="login-feature-item">
                <ChevronRight size={16} className="login-feature-icon" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div 
          className="login-right-panel"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay to ensure legibility of the form while letting image shine through */}
          <div className="login-right-overlay"></div>
          
          <div className="login-form-wrapper">
            <div className="login-header-container" key={isLoginMode ? 'signIn' : 'signUp'}>
              <h2 className="login-header-title">{isLoginMode ? 'Welcome Back' : 'Create an Account'}</h2>
              <p className="login-header-desc">{isLoginMode ? 'Sign in to your account' : 'Sign up to request quotes & track orders'}</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              <div 
                className={`login-extra-fields ${
                  isLoginMode ? 'login-extra-fields-hidden' : 'login-extra-fields-visible'
                }`}
              >
                <div className="login-form-group">
                  <label className="login-label">Full Name</label>
                  <input type="text" className="login-input" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required={!isLoginMode} autoComplete="off" tabIndex={isLoginMode ? -1 : 0} />
                </div>
                <div className="login-form-group">
                  <label className="login-label">Mobile Number</label>
                  <div className="login-mobile-input-wrapper">
                    <span className="login-mobile-prefix">
                      +91
                    </span>
                    <input type="tel" id="login-mobile" className="login-mobile-input" placeholder="9xxxxxxxxx" maxLength={10} value={mobile} onChange={e => setMobile(e.target.value.replace(/[^0-9]/g, ''))} required={!isLoginMode} autoComplete="off" tabIndex={isLoginMode ? -1 : 0} />
                  </div>
                </div>
              </div>

              <div className="login-form-group">
                <label className="login-label">Email Address</label>
                <input type="email" className="login-input" placeholder="client@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required id="login-email" autoComplete="off" />
              </div>

              <div className="login-form-group">
                <label className="login-label">Password</label>
                <div className="login-password-wrapper">
                  <input type={showPassword ? 'text' : 'password'} className="login-password-input" placeholder={!isLoginMode ? 'Create a password' : 'Enter your password'} value={password} onChange={e => setPassword(e.target.value)} required id="login-password" autoComplete="new-password" />
                  <button type="button" className="login-password-toggle" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="login-submit-btn" disabled={loading} id="login-submit-btn">
                {loading ? (
                  <><div className="login-spinner" /> Processing...</>
                ) : (
                  <span className="login-btn-text" key={isLoginMode ? 'btn-in' : 'btn-up'}>
                    {isLoginMode ? 'Sign In' : 'Sign Up'} <ChevronRight size={16} />
                  </span>
                )}
              </button>

              <div className="login-divider">
                <span>Or continue with</span>
              </div>

              <div className="login-google-wrapper">
                <button type="button" className="login-google-btn" onClick={handleGoogleSignIn}>
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" height="20" />
                  Continue with Google
                </button>
              </div>

            </form>

            <div className="login-footer">
              {isLoginMode ? "Don't have an account? " : "If you already have an account? "}
              <button onClick={() => setIsLoginMode(!isLoginMode)} className="login-toggle-btn">
                <span className="login-toggle-text" key={isLoginMode ? 'toggle-up' : 'toggle-in'}>
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
