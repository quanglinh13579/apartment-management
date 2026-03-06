import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logoImg from "../../assets/logo.png"

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="login-container">
      <button className="back-button" onClick={() => navigate('/role-selection')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="header-section">
        <div className="logo-container">
          <img src={logoImg} alt="logo" />
        </div>
        <h1 className="login-title">Log in</h1>
        <p className="login-subtitle">Smart. Safe. Comfortable</p>
      </div>

      <form className="form-section" onSubmit={handleLogin}>
        <div className="input-wrapper">
          <input 
            type="text" 
            placeholder="Email/ Phone number" 
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type="button" 
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>

        <div className="form-options">
          <label className="remember-me">
            <input 
              type="checkbox" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember me</span>
          </label>
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>
      </form>

      <div className="footer-section">
        <button className="login-button" onClick={handleLogin}>
          Log in
        </button>
        <div className="signup-text">
          Don't have an account{"  "}
          <a href="#" className="signup-link">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
