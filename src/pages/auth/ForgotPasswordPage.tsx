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

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const forgotPasswordSchema = z.object({
    emailOrPhone: z.string().min(1, { message: t('validation.email_required') }),
  });

  type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema) as any,
    mode: 'onTouched',
    defaultValues: {
      emailOrPhone: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    console.log('Forgot password submitted:', data);
    navigate("/verification");
  };

  return (
    <div className="auth-container">
      <div
        className="bg-none border-none p-2 cursor-pointer w-fit mb-5"
        onClick={() => navigate("/login")}
      >
        <BackIcon />
      </div>
      <div className="auth-header">
        <div className="logo-container">
          <Logo />
        </div>
        <h1 className="auth-title">{t('forgotpassword.title')}</h1>
        <p className="auth-subtitle whitespace-pre-line">{t('forgotpassword.subtitle')}</p>
      </div>

      <Form {...form}>
        <form className="auth-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FormField
            control={form.control}
            name="emailOrPhone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t('forgotpassword.placeholder')} {...field} autoComplete="off" />
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
              {t('forgotpassword.send_button')}
            </Button>
            <div className="text-center mt-3 text-text-muted text-base">
              {t('forgotpassword.back_to')}
              <span onClick={() => !form.formState.isSubmitting && navigate("/login")} className="text-text-link font-medium no-underline ml-1 cursor-pointer hover:underline"> {t('signup.login')}</span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;

