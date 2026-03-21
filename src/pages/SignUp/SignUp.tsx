import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './SignUp.css';
import logoImg from "../../assets/logo.png";
import { ROUTES, MESSAGES } from "../../constants/Index";
import Button from '../../components/Button';
import Input from '../../components/Input';

const signUpSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  buildingNumber: z.string().min(1, { message: "Building number is required" }),
  roomNumber: z.string().min(1, { message: "Room number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp = () => {
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
        <h1 className="signup-title">{MESSAGES.SIGN_UP}</h1>
        <p className="signup-subtitle">{MESSAGES.SIGN_UP_SUBTITLE}</p>
      </div>
      
      <form className="form-section" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-row">
          <Input
            type="text"
            placeholder={MESSAGES.FIRST_NAME_PLACEHOLDER}
            {...register('firstName')}
            error={errors.firstName?.message}
            wrapperClassName="flex-1"
          />
          <Input
            type="text"
            placeholder={MESSAGES.LAST_NAME_PLACEHOLDER}
            {...register('lastName')}
            error={errors.lastName?.message}
            wrapperClassName="flex-1"
          />
        </div>

        <div className="form-row">
          <Input
            type="text"
            placeholder={MESSAGES.BUILDING_NUMBER_PLACEHOLDER}
            {...register('buildingNumber')}
            error={errors.buildingNumber?.message}
            wrapperClassName="flex-1"
          />
          <Input
            type="text"
            placeholder={MESSAGES.ROOM_NUMBER_PLACEHOLDER}
            {...register('roomNumber')}
            error={errors.roomNumber?.message}
            wrapperClassName="flex-1"
          />
        </div>

        <Input
          type="email"
          placeholder={MESSAGES.SIGNUP_EMAIL_PLACEHOLDER}
          {...register('email')}
          error={errors.email?.message}
          autoComplete="off"
        />

        <Input
          type="tel"
          placeholder={MESSAGES.PHONE_PLACEHOLDER}
          {...register('phoneNumber')}
          error={errors.phoneNumber?.message}
        />

        <Input
          type="password"
          placeholder={MESSAGES.PASSWORD_PLACEHOLDER}
          {...register('password')}
          error={errors.password?.message}
          autoComplete="new-password"
        />

        <Input
          type="password"
          placeholder={MESSAGES.CONFIRM_PASSWORD_PLACEHOLDER}
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
            {MESSAGES.SIGN_UP_BUTTON}
          </Button>
          <div className="login-text">
            {MESSAGES.ALREADY_HAVE_ACCOUNT}
            <span onClick={() => navigate(ROUTES.LOGIN)} className="login-link">{MESSAGES.LOGIN}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
