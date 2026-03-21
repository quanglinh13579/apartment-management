import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './Login.css';
import logoImg from "../../assets/logo.png";
import { ROUTES, MESSAGES } from "../../constants/Index";
import Button from '../../components/Button';
import Input from '../../components/Input';
import BackIcon from '../../components/Icons/BackIcon';

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email or phone number is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
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
        onClick={() => navigate(ROUTES.ROLE_SELECTION)}
      >
        <BackIcon />
      </div>
      <div className="header-section">
        <div className="logo-container">
          <img src={logoImg} alt="logo" />
        </div>
        <h1 className="login-title">{MESSAGES.LOGIN_TITLE}</h1>
        <p className="login-subtitle">{MESSAGES.LOGIN_SUBTITLE}</p>
      </div>
      
      <form className="form-section" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          type="text"
          placeholder={MESSAGES.LOGIN_EMAIL_PLACEHOLDER}
          {...register('email')}
          error={errors.email?.message}
          autoComplete="off"
        />
        <Input
          type="password"
          hasPasswordToggle
          placeholder={MESSAGES.PASSWORD_PLACEHOLDER}
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
                label={MESSAGES.REMEMBER_ME}
                checked={field.value}
                onChange={(e: any) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                ref={field.ref}
                wrapperClassName="mb-0"
              />
            )}
          />
          <a href="#" className="forgot-password">{MESSAGES.FORGOT_PASSWORD}</a>
        </div>

        <div className="footer-section">
          <Button
            type="submit"
            variant="secondary"
          >
            {MESSAGES.LOGIN_BUTTON}
          </Button>
          <div className="signup-text">
            {MESSAGES.DONT_HAVE_ACCOUNT}
            <span onClick={() => navigate(ROUTES.SIGN_UP)} className="signup-link">{MESSAGES.SIGN_UP}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
