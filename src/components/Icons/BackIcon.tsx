import React from 'react';

interface BackIconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

const BackIcon: React.FC<BackIconProps> = ({ 
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
        d="M10.6663 19L3.99963 12M3.99963 12L10.6663 5M3.99963 12L19.9996 12" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BackIcon;
