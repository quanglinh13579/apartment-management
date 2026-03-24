import React from 'react';

interface ResidentIconProps {
  size?: number | string;
  className?: string;
}

const ResidentIcon: React.FC<ResidentIconProps> = ({ 
  size = 48, 
  className = '' 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="48" height="48" rx="8" fill="#A6A5A5"/>
      <path 
        d="M32.5333 33.5999V31.4666C32.5333 30.335 32.0838 29.2497 31.2837 28.4496C30.4835 27.6494 29.3983 27.1999 28.2667 27.1999H19.7333C18.6018 27.1999 17.5165 27.6494 16.7164 28.4496C15.9162 29.2497 15.4667 30.335 15.4667 31.4666V33.5999M28.2667 18.6666C28.2667 21.023 26.3564 22.9332 24 22.9332C21.6436 22.9332 19.7333 21.023 19.7333 18.6666C19.7333 16.3102 21.6436 14.3999 24 14.3999C26.3564 14.3999 28.2667 16.3102 28.2667 18.6666Z" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ResidentIcon;
