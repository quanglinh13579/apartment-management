import React from 'react';

interface PencilIconProps {
  size?: number | string;
  className?: string;
}

const PencilIcon: React.FC<PencilIconProps> = ({
  size = 32,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="32" height="32" rx="16" fill="#C7C7C7" />
    <path
      d="M11 18.5002L13.9167 21.0002M10.5834 18.5002L18.7996 9.99699C19.6843 9.11233 21.1186 9.11233 22.0032 9.99698C22.8879 10.8816 22.8879 12.3159 22.0032 13.2006L13.5 21.4168L9.33337 22.6668L10.5834 18.5002Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PencilIcon;
