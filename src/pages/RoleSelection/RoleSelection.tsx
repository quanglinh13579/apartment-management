import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css';
import logoImg from "../../assets/logo.png"
import { useAppDispatch } from '../../redux/hooks';
import { setRole } from '../../redux/slices/authSlice';

const RoleSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedRole, setSelectedRole] = useState<'resident' | 'management' | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedRole) {
      dispatch(setRole(selectedRole));
      navigate('/login');
    } else {
      alert('Please select a role before continuing!');
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
        <h1 className="welcome-title">Welcome</h1>
        <p className="welcome-subtitle">Smart. Safe. Comfortable</p>
      </div>
      <div className="main-content">
        <p className="role-label">Your role is:</p>
        <div className="role-cards">
          <div 
            className={`role-card ${selectedRole === 'resident' ? 'selected' : ''}`}
            onClick={() => setSelectedRole('resident')}
          >
            <div className="role-icon-box resident">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="role-info">
              <span className="role-name">Resident</span>
              <span className="role-description">Check status, receive notification</span>
            </div>
          </div>
          <div 
            className={`role-card ${selectedRole === 'management' ? 'selected' : ''}`}
            onClick={() => setSelectedRole('management')}
          >
            <div className="role-icon-box management">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="17.5" cy="8.5" r="2.5" />
                <path d="M15 15.5c1-1 4-1 5 0" />
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="role-info">
              <span className="role-name">Building Management Board</span>
              <span className="role-description">Monitor all</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-section">
        <button 
          className="next-button"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
