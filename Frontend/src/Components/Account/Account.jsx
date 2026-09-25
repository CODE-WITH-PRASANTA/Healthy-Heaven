import React, { useState, useEffect } from 'react';
import './Account.css';

const Account = ({ isOpen, onClose }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Close when pressing the 'Escape' key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Flash notification helper
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Google OAuth / Authentication Handler
  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast('Successfully signed in with Google!');
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      showToast('Google sign-in failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Form Submit Handler (Sign In / Register)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (isRegisterMode) {
        showToast('Registration successful! Please sign in.');
        setIsRegisterMode(false);
        setPassword('');
      } else {
        showToast('Welcome back! Login successful.');
        setTimeout(() => onClose(), 1200);
      }
    }, 900);
  };

  const toggleMode = (mode) => {
    setIsRegisterMode(mode);
    setNotification(null);
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`Account-overlay ${isOpen ? 'Account-overlay-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Drawer Container */}
      <aside
        className={`Account-drawer ${isOpen ? 'Account-drawer-open' : ''}`}
        aria-labelledby="Account-title"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          className="Account-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="Account-content">
          {notification && (
            <div
              className={`Account-notification Account-notification-${notification.type}`}
            >
              {notification.message}
            </div>
          )}

          <div className="Account-header">
            <h2 id="Account-title" className="Account-title">
              {isRegisterMode ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="Account-subtitle">
              {isRegisterMode
                ? 'Join our 100% remote network of creators & freelancers today.'
                : "We'd love to have you join our network today."}
            </p>
          </div>

          <button
            type="button"
            className="Account-google-btn"
            onClick={handleGoogleAuth}
            disabled={isLoading}
          >
            <svg
              className="Account-google-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.26-2.09 3.67-5.17 3.67-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.28v3.15C3.26 21.31 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.24c-.25-.72-.39-1.49-.39-2.24s.14-1.52.39-2.24V6.61H1.28C.46 8.23 0 10.06 0 12s.46 3.77 1.28 5.39l3.99-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.69 1.28 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            <span>
              {isRegisterMode ? 'Sign Up with Google' : 'Sign In with Google'}
            </span>
          </button>

          <div className="Account-divider">
            <span className="Account-divider-line"></span>
            <span className="Account-divider-text">OR</span>
            <span className="Account-divider-line"></span>
          </div>

          <form className="Account-form" onSubmit={handleSubmit}>
            {isRegisterMode && (
              <div className="Account-form-group">
                <label htmlFor="account-name" className="Account-label">
                  Full Name<span className="Account-required">*</span>
                </label>
                <input
                  id="account-name"
                  type="text"
                  className="Account-input"
                  placeholder="Enter Your Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="Account-form-group">
              <label htmlFor="account-email" className="Account-label">
                Email<span className="Account-required">*</span>
              </label>
              <input
                id="account-email"
                type="email"
                className="Account-input"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="Account-form-group">
              <label htmlFor="account-password" className="Account-label">
                Password<span className="Account-required">*</span>
              </label>
              <div className="Account-password-wrapper">
                <input
                  id="account-password"
                  type={showPassword ? 'text' : 'password'}
                  className="Account-input Account-password-input"
                  placeholder={
                    isRegisterMode ? 'Create a Password' : 'Enter a Password'
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="Account-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#8a99a8"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#8a99a8"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="Account-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="Account-loader"></span>
              ) : isRegisterMode ? (
                'Create Account'
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="Account-footer">
            {isRegisterMode ? (
              <>
                <span className="Account-footer-text">
                  Already have an account?{' '}
                </span>
                <button
                  type="button"
                  className="Account-footer-link"
                  onClick={() => toggleMode(false)}
                >
                  Sign In here
                </button>
              </>
            ) : (
              <>
                <span className="Account-footer-text">Not registered? </span>
                <button
                  type="button"
                  className="Account-footer-link"
                  onClick={() => toggleMode(true)}
                >
                  Register here
                </button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Account;