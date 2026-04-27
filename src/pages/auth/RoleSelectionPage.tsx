import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from "../../lib/utils";
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setSelectedRole } from '../../redux/slices/authSlice';
import type { UserRole } from '../../redux/slices/authSlice';
import Logo from '../../components/ui/logo';
import { USER_ROLES } from '../../constants/Index';
import { Button } from '../../components/ui/button';
import ResidentIcon from '../../components/Icons/ResidentIcon';
import ManagementIcon from '../../components/Icons/ManagementIcon';

const RoleSelectionPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedRole = useAppSelector((state) => state.auth.selectedRole);

  const handleSelectRole = (role: UserRole) => {
    dispatch(setSelectedRole(role));
  };

  const handleNext = () => {
    if (selectedRole) {
      navigate("/login");
    } else {
      alert(t('roleselection.please_select_role'));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="mb-0">
          <Logo />
        </div>
        <h1 className="auth-title">{t('roleselection.title')}</h1>
        <p className="auth-subtitle">{t('roleselection.subtitle')}</p>
      </div>
      <div className="flex flex-col grow">
        <p className="text-text-dark font-medium ml-3 mb-4">{t('roleselection.your_role_is')}</p>
        <div className="flex flex-col gap-4 w-full">
          <div
            className={cn(
              "role-card-custom",
              selectedRole === USER_ROLES.RESIDENT ? 'border-border-dark bg-bg-muted' : 'bg-white'
            )}
            onClick={() => handleSelectRole(USER_ROLES.RESIDENT as UserRole)}
          >
            <div className={cn(
              "role-icon-box-custom",
              selectedRole === USER_ROLES.RESIDENT ? 'bg-transparent' : 'bg-bg-muted text-text-muted'
            )}>
              <ResidentIcon />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-bold",
                selectedRole === USER_ROLES.RESIDENT ? 'text-text-main' : 'text-text-main'
              )}>{t('roleselection.resident_name')}</span>
              <span className="text-auth-desc text-text-muted">{t('roleselection.resident_desc')}</span>
            </div>
          </div>
          <div
            className={cn(
              "role-card-custom",
              selectedRole === USER_ROLES.MANAGEMENT ? 'border-border-dark bg-bg-muted' : 'bg-white'
            )}
            onClick={() => handleSelectRole(USER_ROLES.MANAGEMENT as UserRole)}
          >
            <div className={cn(
              "role-icon-box-custom",
              selectedRole === USER_ROLES.MANAGEMENT ? 'bg-transparent' : 'bg-bg-muted text-text-muted'
            )}>
              <ManagementIcon />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-bold",
                selectedRole === USER_ROLES.MANAGEMENT ? 'text-text-main' : 'text-text-main'
              )}>{t('roleselection.management_name')}</span>
              <span className="text-auth-desc text-text-muted">{t('roleselection.management_desc')}</span>
            </div>
          </div>

        </div>
      </div>


      <div className="auth-footer">
        <Button
          className="w-full"
          onClick={handleNext}
          variant="secondary"
        >
          {t('roleselection.next')}
        </Button>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
