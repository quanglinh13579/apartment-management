import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import Logo from '../../components/ui/logo';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import BackIcon from '../../components/Icons/BackIcon';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";

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

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema) as any,
    mode: 'onTouched',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    console.log('Reset Password submitted:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div
        className="bg-none border-none p-2 cursor-pointer w-fit mb-5"
        onClick={() => navigate("/verification")}
      >
        <BackIcon />
      </div>
      <div className="auth-header">
        <div className="mb-0">
          <Logo />
        </div>
        <h1 className="auth-title">{t('resetpassword.title')}</h1>
        <p className="auth-subtitle">{t('resetpassword.subtitle')}</p>
      </div>

      <Form {...form}>
        <form className="auth-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" hasPasswordToggle placeholder={t('resetpassword.password_placeholder')} {...field} autoComplete="new-password" />
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
                  <Input type="password" hasPasswordToggle placeholder={t('resetpassword.confirm_password_placeholder')} {...field} autoComplete="new-password" />
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
              {t('resetpassword.save_button')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordPage;
