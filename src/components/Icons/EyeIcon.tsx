import React from 'react';

interface EyeIconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

const EyeIcon: React.FC<EyeIconProps> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8-11-8-11-8z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M14.4 12.0291C14.4 13.3189 13.3255 14.3645 12 14.3645C10.6745 14.3645 9.60002 13.3189 9.60002 12.0291C9.60002 10.7393 10.6745 9.69377 12 9.69377C13.3255 9.69377 14.4 10.7393 14.4 12.0291Z" 
        stroke={color} 
        strokeWidth="2"
      />
    </svg>
  );
};

export default EyeIcon;
