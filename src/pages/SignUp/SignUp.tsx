import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import './SignUp.css';
import logoImg from "../../assets/logo.png";
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignUp = () => {
  const { t } = useTranslation();

  const signUpSchema = z.object({
    firstName: z.string().min(1, { message: t('validation.first_name_required') }),
    lastName: z.string().min(1, { message: t('validation.last_name_required') }),
    buildingNumber: z.string().min(1, { message: t('validation.building_number_required') }),
    roomNumber: z.string().min(1, { message: t('validation.room_number_required') }),
    email: z.string().email({ message: t('validation.invalid_email') }),
    phoneNumber: z.string().min(10, { message: t('validation.phone_min_length') }),
    password: z.string().min(6, { message: t('validation.password_min_length') }),
    confirmPassword: z.string().min(6, { message: t('validation.confirm_password_min_length') }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('validation.passwords_not_match'),
    path: ["confirmPassword"],
  });

  type SignUpFormValues = z.infer<typeof signUpSchema>;

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      buildingNumber: '',
      roomNumber: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log('Sign Up submitted:', data);
  };

  return (
    <div className="signup-container">
      <div className="header-section">
        <div className="logo-container">
          <img src={logoImg} alt="logo" />
        </div>
        <h1 className="signup-title">{t('signup.title')}</h1>
        <p className="signup-subtitle">{t('signup.subtitle')}</p>
      </div>

      <form className="form-section" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-row">
          <Input
            type="text"
            placeholder={t('signup.first_name_placeholder')}
            {...register('firstName')}
            error={errors.firstName?.message}
            wrapperClassName="flex-1"
          />
          <Input
            type="text"
            placeholder={t('signup.last_name_placeholder')}
            {...register('lastName')}
            error={errors.lastName?.message}
            wrapperClassName="flex-1"
          />
        </div>

        <div className="form-row">
          <Input
            type="text"
            placeholder={t('signup.building_number_placeholder')}
            {...register('buildingNumber')}
            error={errors.buildingNumber?.message}
            wrapperClassName="flex-1"
          />
          <Input
            type="text"
            placeholder={t('signup.room_number_placeholder')}
            {...register('roomNumber')}
            error={errors.roomNumber?.message}
            wrapperClassName="flex-1"
          />
        </div>

        <Input
          type="email"
          placeholder={t('signup.email_placeholder')}
          {...register('email')}
          error={errors.email?.message}
          autoComplete="off"
        />

        <Input
          type="tel"
          placeholder={t('signup.phone_placeholder')}
          {...register('phoneNumber')}
          error={errors.phoneNumber?.message}
        />

        <Input
          type="password"
          placeholder={t('signup.password_placeholder')}
          {...register('password')}
          error={errors.password?.message}
          autoComplete="new-password"
        />

        <Input
          type="password"
          placeholder={t('signup.confirm_password_placeholder')}
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
        />

        <div className="footer-section">
          <Button
            type="submit"
            variant="secondary"
            onClick={() => {
              if (Object.keys(errors).length > 0) {
                console.log('Form has errors:', errors);
              }
            }}
          >
            {t('signup.button')}
          </Button>
          <div className="login-text">
            {t('signup.already_have_account')}
            <span onClick={() => navigate("/login")} className="login-link">{t('signup.login')}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
