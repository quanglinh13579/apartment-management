import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './VerificationPage.css';
import Logo from '../../../components/ui/logo';
import { Button } from '../../../components/ui/button';
import BackIcon from '../../../components/Icons/BackIcon';

const VerificationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    console.log('Verifying OTP:', otpString);
    navigate("/reset-password");
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      console.log('Resending code...');
    }
  };

  return (
    <div className="verification-container">
      <div
        className="back-button"
        onClick={() => navigate("/forgot-password")}
      >
        <BackIcon />
      </div>
      <div className="header-section">
        <div className="logo-container">
          <Logo />
        </div>
        <h1 className="verification-title">{t('verification.title')}</h1>
        <p className="verification-subtitle">{t('verification.subtitle')}</p>
      </div>

      <div className="otp-section">
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="otp-input"
            />
          ))}
        </div>
        <div className="resend-container">
          <span className="resend-text">{t('verification.resend_code_question')}</span>
          <span
            className={`resend-link ${timer > 0 ? 'disabled' : ''}`}
            onClick={handleResend}
          >
            {t('verification.resend_code_link')}
            {timer > 0 && <span className="timer"> ({timer}s)</span>}
          </span>
        </div>
      </div>

      <div className="footer-section">
        <Button
          onClick={handleVerify}
          variant="secondary"
          disabled={otp.some(d => !d)}
        >
          {t('verification.verify_button')}
        </Button>
      </div>
    </div>
  );
};

export default VerificationPage;
