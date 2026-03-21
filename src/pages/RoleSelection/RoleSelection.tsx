import { useNavigate } from 'react-router-dom';
import './RoleSelection.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setSelectedRole } from '../../redux/slices/authSlice';
import type { UserRole } from '../../redux/slices/authSlice';
import logoImg from '../../assets/logo.png';
import { ROUTES, MESSAGES, USER_ROLES } from '../../constants/Index';
import Button from '../../components/Button';
import ResidentIcon from '../../components/Icons/ResidentIcon';
import ManagementIcon from '../../components/Icons/ManagementIcon';

const RoleSelection = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedRole = useAppSelector((state) => state.auth.selectedRole);

  const handleSelectRole = (role: UserRole) => {
    dispatch(setSelectedRole(role));
  };

  const handleNext = () => {
    if (selectedRole) {
      navigate(ROUTES.LOGIN);
    } else {
      alert(MESSAGES.PLEASE_SELECT_ROLE);
    }
  };

  return (
    <div className="role-selection-container">
      <div className="header-section">
        <div className="logo-container">
          <img
            src={logoImg}
            alt="logo"
          />
        </div>
        <h1 className="welcome-title">{MESSAGES.WELCOME_TITLE}</h1>
        <p className="welcome-subtitle">{MESSAGES.WELCOME_SUBTITLE}</p>
      </div>
      <div className="main-content">
        <p className="role-label">{MESSAGES.YOUR_ROLE_IS}</p>
        <div className="role-cards">
          <div
            className={`role-card ${selectedRole === USER_ROLES.RESIDENT ? 'selected' : ''}`}
            onClick={() => handleSelectRole(USER_ROLES.RESIDENT as UserRole)}
          >
            <div className="role-icon-box resident">
              <ResidentIcon />
            </div>
            <div className="role-info">
              <span className="role-name">{MESSAGES.RESIDENT_NAME}</span>
              <span className="role-description">{MESSAGES.RESIDENT_DESC}</span>
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
              <span className="role-name">{MESSAGES.MANAGEMENT_NAME}</span>
              <span className="role-description">{MESSAGES.MANAGEMENT_DESC}</span>
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
          {MESSAGES.NEXT}
        </Button>
      </div>
    </div>
  );
};

export default RoleSelection;
