import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import Logo from '../../components/ui/logo';
import { Button } from '../../components/ui/button';
import BackIcon from '../../components/Icons/BackIcon';

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
    <div className="auth-container">
      <div
        className="bg-none border-none p-2 cursor-pointer w-fit mb-5"
        onClick={() => navigate("/forgot-password")}
      >
        <BackIcon />
      </div>
      <div className="auth-header">
        <div className="mb-0">
          <Logo />
        </div>
        <h1 className="auth-title">{t('verification.title')}</h1>
        <p className="auth-subtitle">{t('verification.subtitle')}</p>
      </div>

      <div className="flex flex-col grow gap-6">
        <div className="flex justify-between w-full">
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
              className="otp-input-custom"
            />
          ))}
        </div>
        <div className="flex justify-center gap-1">
          <span className="text-muted-custom text-base">{t('verification.resend_code_question')}</span>
          <span
            className={cn(
              "font-bold cursor-pointer hover:underline",
              timer > 0 ? "text-text-muted cursor-not-allowed no-underline" : "text-link-custom"
            )}
            onClick={handleResend}
          >
            {t('verification.resend_code_link')}
            {timer > 0 && <span className="ml-1"> ({timer}s)</span>}
          </span>
        </div>
      </div>

      <div className="auth-footer">
        <Button
          onClick={handleVerify}
          variant="secondary"
          disabled={otp.some(d => !d)}
          className="w-full"
        >
          {t('verification.verify_button')}
        </Button>
      </div>
    </div>
  );
};

export default VerificationPage;
