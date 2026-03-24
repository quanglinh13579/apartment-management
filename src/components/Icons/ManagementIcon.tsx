import React from 'react';

interface ManagementIconProps {
  size?: number | string;
  className?: string;
}

const ManagementIcon: React.FC<ManagementIconProps> = ({ 
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
      <rect width="48" height="48" rx="8" fill="#DCDCDC"/>
      <path 
        d="M28.1667 31.5V29.8333C28.1667 28.9493 27.8155 28.1014 27.1904 27.4763C26.5653 26.8512 25.7174 26.5 24.8334 26.5H18.1667C17.2827 26.5 16.4348 26.8512 15.8097 27.4763C15.1846 28.1014 14.8334 28.9493 14.8334 29.8333V31.5M33.1667 31.5V29.8333C33.1662 29.0948 32.9203 28.3773 32.4678 27.7936C32.0154 27.2099 31.3818 26.793 30.6667 26.6083M27.3334 16.6083C28.0504 16.7919 28.6859 17.2089 29.1397 17.7936C29.5936 18.3783 29.8399 19.0974 29.8399 19.8375C29.8399 20.5776 29.5936 21.2967 29.1397 21.8814C28.6859 22.4661 28.0504 22.8831 27.3334 23.0667M24.8334 19.8333C24.8334 21.6743 23.341 23.1667 21.5 23.1667C19.6591 23.1667 18.1667 21.6743 18.1667 19.8333C18.1667 17.9924 19.6591 16.5 21.5 16.5C23.341 16.5 24.8334 17.9924 24.8334 19.8333Z" 
        stroke="#5C5C5C" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ManagementIcon;
