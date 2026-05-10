import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import BackIcon from '../../components/Icons/BackIcon';
import Logo from '../../components/ui/logo';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useAppDispatch } from '../../redux/store';
import { Checkbox } from '../../components/ui/checkbox';
import { setUser, setLoading } from '../../redux/slices/authSlice';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";

const SignInPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginSchema = z.object({
    emailOrPhone: z.string().min(1, { message: t('validation.email_required') }),
    password: z.string().min(6, { message: t('validation.password_min_length') }),
    rememberMe: z.boolean().default(false),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) as any,
    mode: 'onTouched',
    defaultValues: {
      emailOrPhone: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log('Login submitted:', data);
    dispatch(setLoading(true));
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    dispatch(setUser({ id: '1', email: data.emailOrPhone, firstName: 'User', lastName: 'Name' }));
    dispatch(setLoading(false));
    navigate("/home");
  };

  return (
    <div className="auth-container">
      <div
        className="bg-none border-none p-2 cursor-pointer w-fit mb-5"
        onClick={() => navigate("/role-selection")}
      >
        <BackIcon />
      </div>
      
      <div className="auth-header">
        <div className="mb-0">
          <Logo />
        </div>
        <h1 className="auth-title">{t('signin.login_title')}</h1>
        <p className="auth-subtitle">{t('signin.login_subtitle')}</p>
      </div>

      <Form {...form}>
        <form className="auth-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FormField
            control={form.control}
            name="emailOrPhone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t('signin.login_email_placeholder')} {...field} autoComplete="username" />
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
                  <Input type="password" hasPasswordToggle placeholder={t('signin.password_placeholder')} {...field} autoComplete="current-password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between px-2">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <label className="text-base font-medium text-text-muted cursor-pointer">
                    {t('signin.remember_me')}
                  </label>
                </FormItem>
              )}
            />
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-base font-medium text-text-main cursor-pointer hover:underline"
            >
              {t('signin.forgot_password')}
            </span>
          </div>

          <div className="auth-footer">
            <Button
              type="submit"
              variant="secondary"
              loading={form.formState.isSubmitting}
              className="w-full"
            >
              {t('signin.login_button')}
            </Button>
            <div className="text-center mt-3 text-text-muted text-base">
              {t('signin.dont_have_account')}
              <span onClick={() => navigate("/sign-up")} className="text-text-link font-bold no-underline ml-1 cursor-pointer hover:underline"> {t('signin.sign_up')}</span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInPage;
