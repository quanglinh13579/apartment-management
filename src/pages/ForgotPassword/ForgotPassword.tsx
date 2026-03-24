import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './ForgotPassword.css';
import logoImg from "../../assets/logo.png";
import { ROUTES, MESSAGES } from "../../constants/Index";
import Button from '../../components/Button';
import Input from '../../components/Input';
import BackIcon from '../../components/Icons/BackIcon';

const forgotPasswordSchema = z.object({
  emailOrPhone: z.string().min(1, { message: "Email or phone number is required" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      emailOrPhone: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log('Forgot password submitted:', data);
  };

  return (
    <div className="forgot-password-container">
      <div
        className="back-button"
        onClick={() => navigate(ROUTES.LOGIN)}
      >
        <BackIcon />
      </div>
      <div className="header-section">
        <div className="logo-container">
          <img src={logoImg} alt="logo" />
        </div>
        <h1 className="forgot-password-title">{MESSAGES.FORGOT_PASSWORD_TITLE}</h1>
        <p className="forgot-password-subtitle">{MESSAGES.FORGOT_PASSWORD_SUBTITLE}</p>
      </div>
      
      <form className="form-section" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          type="text"
          placeholder={MESSAGES.FORGOT_PASSWORD_PLACEHOLDER}
          {...register('emailOrPhone')}
          error={errors.emailOrPhone?.message}
          autoComplete="off"
        />

        <div className="footer-section">
          <Button
            type="submit"
            variant="secondary"
          >
            {MESSAGES.SEND_BUTTON}
          </Button>
          <div className="back-login-text">
            {MESSAGES.BACK_TO}
            <span onClick={() => navigate(ROUTES.LOGIN)} className="back-login-link"> {MESSAGES.LOGIN}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
