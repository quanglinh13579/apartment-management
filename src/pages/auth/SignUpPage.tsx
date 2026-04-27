import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Logo from '../../components/ui/logo';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useAppDispatch } from '../../redux/store';
import { setUser, setLoading } from '../../redux/slices/authSlice';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";

const SignUpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema) as any,
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
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setUser({
        id: '2',
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      }));
      dispatch(setLoading(false));
      navigate("/verification");
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="mb-0">
          <Logo />
        </div>
        <h1 className="auth-title">{t('signup.title')}</h1>
        <p className="auth-subtitle">{t('signup.subtitle')}</p>
      </div>

      <Form {...form}>
        <form className="auth-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="flex gap-2 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder={t('signup.first_name_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder={t('signup.last_name_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2 w-full">
            <FormField
              control={form.control}
              name="buildingNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder={t('signup.building_number_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder={t('signup.room_number_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t('signup.email_placeholder')} {...field} autoComplete="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t('signup.phone_placeholder')} {...field} autoComplete="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" hasPasswordToggle placeholder={t('signup.password_placeholder')} {...field} autoComplete="new-password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" hasPasswordToggle placeholder={t('signup.confirm_password_placeholder')} {...field} autoComplete="new-password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="auth-footer">
            <Button
              type="submit"
              variant="secondary"
              loading={form.formState.isSubmitting}
              className="w-full"
            >
              {t('signup.button')}
            </Button>
            <div className="text-center mt-3 text-text-muted text-base">
              {t('signup.already_have_account')}
              <span onClick={() => navigate("/login")} className="text-text-link font-bold no-underline ml-1 cursor-pointer hover:underline"> {t('signup.login')}</span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpPage;
