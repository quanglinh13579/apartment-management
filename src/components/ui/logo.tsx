import React from 'react';
import logoImg from "../../assets/logo.png";
import { cn } from "../../lib/utils";

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'auth';
}

const Logo: React.FC<LogoProps> = ({ className, size = 'auth' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24',
    auth: 'auth-logo'
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <img 
        src={logoImg} 
        alt="Apartment Management Logo" 
        className={cn(
          "object-contain",
          size === 'auth' ? "auth-logo" : `w-auto ${sizeClasses[size]}`,
          className
        )}
      />
    </div>
  );
};

export default Logo;
