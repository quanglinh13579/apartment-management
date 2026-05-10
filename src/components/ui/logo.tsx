import React from 'react';
import logoImg from "../../assets/logo.png";
import { cn } from "../../lib/utils";

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'auth';
}

const Logo: React.FC<LogoProps> = ({ className, size = 'auth' }) => {
  const sizeClasses = {
    sm: 'h-14',
    md: 'h-18',
    lg: 'h-24',
    xl: 'h-32',
    auth: 'w-48 h-auto mb-4'
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <img 
        src={logoImg} 
        alt="Apartment Management Logo" 
        className={cn(
          "object-contain mix-blend-multiply",
          sizeClasses[size] || sizeClasses.auth
        )}
      />
    </div>
  );
};

export default Logo;
