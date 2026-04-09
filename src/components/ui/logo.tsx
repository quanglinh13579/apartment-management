import React from 'react';
import logoImg from "../../assets/logo.png";

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  return (
    <div className={`flex items-center justify-center ${className || ''}`.trim()}>
      <img 
        src={logoImg} 
        alt="Apartment Management Logo" 
        className={`w-auto object-contain ${sizeClasses[size]}`.trim()}
      />
    </div>
  );
};

export default Logo;
