import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logoImg from "../../assets/logo.png";
import { ROUTES, MESSAGES } from "../../constants/Index";
import Button from '../../components/Button';
import Input from '../../components/Input';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    console.log('Login submitted:', { email, password, rememberMe });
  };

  return (
    <div className="login-container">
      <Button
        className="back-button"
        variant="light"
        onClick={() => navigate(ROUTES.ROLE_SELECTION)}
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        }
      />
      <div className="header-section">
        <div className="logo-container">
          <img src={logoImg} alt="logo" />
        </div>
        <h1 className="login-title">{MESSAGES.LOGIN_TITLE}</h1>
        <p className="login-subtitle">{MESSAGES.LOGIN_SUBTITLE}</p>
      </div>
      
      <form className="form-section" onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder={MESSAGES.EMAIL_PLACEHOLDER}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          hasPasswordToggle
          placeholder={MESSAGES.PASSWORD_PLACEHOLDER}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="form-options">
          <Input
            controlType="checkbox"
            label={MESSAGES.REMEMBER_ME}
            checked={rememberMe}
            onChange={(e: any) => setRememberMe(e.target.checked)}
            wrapperClassName="mb-0"
          />
          <a href="#" className="forgot-password">{MESSAGES.FORGOT_PASSWORD}</a>
        </div>
      </form>

      <div className="footer-section">
        <Button
          onClick={handleLogin}
          variant="secondary"
        >
          {MESSAGES.LOGIN_BUTTON}
        </Button>
        <div className="signup-text">
          {MESSAGES.DONT_HAVE_ACCOUNT}
          <a href="#" className="signup-link">{MESSAGES.SIGN_UP}</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
