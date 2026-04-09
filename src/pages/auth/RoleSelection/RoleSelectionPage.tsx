import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './RoleSelectionPage.css';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { setSelectedRole } from '../../../redux/slices/authSlice';
import type { UserRole } from '../../../redux/slices/authSlice';
import Logo from '../../../components/ui/logo';
import { USER_ROLES } from '../../../constants/Index';
import { Button } from '../../../components/ui/button';
import ResidentIcon from '../../../components/Icons/ResidentIcon';
import ManagementIcon from '../../../components/Icons/ManagementIcon';

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
    <div className="role-selection-container">
      <div className="header-section">
        <div className="logo-container">
          <Logo />
        </div>
        <h1 className="welcome-title">{t('roleselection.title')}</h1>
        <p className="welcome-subtitle">{t('roleselection.subtitle')}</p>
      </div>
      <div className="main-content">
        <p className="role-label">{t('roleselection.your_role_is')}</p>
        <div className="role-cards">
          <div
            className={`role-card ${selectedRole === USER_ROLES.RESIDENT ? 'selected' : ''}`}
            onClick={() => handleSelectRole(USER_ROLES.RESIDENT as UserRole)}
          >
            <div className="role-icon-box resident">
              <ResidentIcon />
            </div>
            <div className="role-info">
              <span className="role-name">{t('roleselection.resident_name')}</span>
              <span className="role-description">{t('roleselection.resident_desc')}</span>
            </div>
          </div>
          <div
            className={`role-card ${selectedRole === USER_ROLES.MANAGEMENT ? 'selected' : ''}`}
            onClick={() => handleSelectRole(USER_ROLES.MANAGEMENT as UserRole)}
          >
            <div className="role-icon-box management">
              <ManagementIcon />
            </div>
            <div className="role-info">
              <span className="role-name">{t('roleselection.management_name')}</span>
              <span className="role-description">{t('roleselection.management_desc')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-section">
        <Button
          className="next-button"
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
