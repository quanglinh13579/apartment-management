import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import './ResetPasswordPage.css';
import Logo from '../../../components/ui/logo';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import BackIcon from '../../../components/Icons/BackIcon';

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const resetPasswordSchema = z.object({
    password: z.string().min(6, { message: t('validation.password_min_length') }),
    confirmPassword: z.string().min(6, { message: t('validation.confirm_password_min_length') }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('validation.passwords_not_match'),
    path: ["confirmPassword"],
  });

  type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    console.log('Reset Password submitted:', data);
    // Logic for saving new password would go here
    navigate("/login");
  };

  return (
    <div className="reset-password-container">
      <div
        className="back-button"
        onClick={() => navigate("/verification")}
      >
        <BackIcon />
      </div>
      <div className="header-section">
        <div className="logo-container">
          <Logo />
        </div>
        <h1 className="reset-password-title">{t('resetpassword.title')}</h1>
        <p className="reset-password-subtitle">{t('resetpassword.subtitle')}</p>
      </div>

      <form className="form-section" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          type="password"
          hasPasswordToggle
          placeholder={t('resetpassword.password_placeholder')}
          {...register('password')}
          error={errors.password?.message}
          autoComplete="new-password"
        />
        <Input
          type="password"
          hasPasswordToggle
          placeholder={t('resetpassword.confirm_password_placeholder')}
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
        />

        <div className="footer-section">
          <Button
            type="submit"
            variant="secondary"
          >
            {t('resetpassword.save_button')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
