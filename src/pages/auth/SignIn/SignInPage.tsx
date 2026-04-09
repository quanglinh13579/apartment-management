import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import './SignInPage.css';
import logoImg from "../../../assets/logo.png";
import BackIcon from '../../../components/Icons/BackIcon';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

const SignInPage = () => {
  const { t } = useTranslation();

  const loginSchema = z.object({
    email: z.string().min(1, { message: t('validation.email_required') }),
    password: z.string().min(6, { message: t('validation.password_min_length') }),
    rememberMe: z.boolean(),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) as any,
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('Login submitted:', data);
  };

  return (
    <div className="login-container">
      <div
        className="back-button"
        onClick={() => navigate("/role-selection")}
      >
        <BackIcon />
      </div>
      <div className="header-section">
        <div className="logo-container">
          <img src={logoImg} alt="logo" />
        </div>
        <h1 className="login-title">{t('signin.login_title')}</h1>
        <p className="login-subtitle">{t('signin.login_subtitle')}</p>
      </div>

      <form className="form-section" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          type="text"
          placeholder={t('signin.login_email_placeholder')}
          {...register('email')}
          error={errors.email?.message}
          autoComplete="off"
        />
        <Input
          type="password"
          hasPasswordToggle
          placeholder={t('signin.password_placeholder')}
          {...register('password')}
          error={errors.password?.message}
          autoComplete="current-password"
        />
        <div className="form-options">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Input
                controlType="checkbox"
                label={t('signin.remember_me')}
                checked={field.value}
                onChange={(e: any) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                ref={field.ref}
                wrapperClassName="mb-0"
              />
            )}
          />
          <span onClick={() => navigate("/forgot-password")} className="forgot-password">{t('signin.forgot_password')}</span>
        </div>

        <div className="footer-section">
          <Button
            type="submit"
            variant="secondary"
          >
            {t('signin.login_button')}
          </Button>
          <div className="signup-text">
            {t('signin.dont_have_account')}
            <span onClick={() => navigate("/sign-up")} className="signup-link">{t('signin.sign_up')}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
