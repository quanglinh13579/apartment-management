import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import './ForgotPasswordPage.css';
import Logo from '../../../components/ui/logo';
import { Button } from '../../../components/ui/button';
import BackIcon from '../../../components/Icons/BackIcon';
import { Input } from '../../../components/ui/input';

const ForgotPasswordPage = () => {
  const { t } = useTranslation();

  const forgotPasswordSchema = z.object({
    emailOrPhone: z.string().min(1, { message: t('validation.email_required') }),
  });

  type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

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
    navigate("/verification");
  };

  return (
    <div className="forgot-password-container">
      <div
        className="back-button"
        onClick={() => navigate("/login")}
      >
        <BackIcon />
      </div>
      <div className="header-section">
        <div className="logo-container">
          <Logo />
        </div>
        <h1 className="forgot-password-title">{t('forgotpassword.title')}</h1>
        <p className="forgot-password-subtitle">{t('forgotpassword.subtitle')}</p>
      </div>

      <form className="form-section" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          type="text"
          placeholder={t('forgotpassword.placeholder')}
          {...register('emailOrPhone')}
          error={errors.emailOrPhone?.message}
          autoComplete="off"
        />

        <div className="footer-section">
          <Button
            type="submit"
            variant="secondary"
          >
            {t('forgotpassword.send_button')}
          </Button>
          <div className="back-login-text">
            {t('forgotpassword.back_to')}
            <span onClick={() => navigate("/login")} className="back-login-link"> {t('signup.login')}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
