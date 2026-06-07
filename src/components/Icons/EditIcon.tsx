import React from 'react';

interface EditIconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

const EditIcon: React.FC<EditIconProps> = ({
  size = 24,
  color = '#5C5C5C',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6 15L9.5 18M5.5 15L15.3595 4.79619C16.4211 3.73461 18.1422 3.7346 19.2038 4.79619C20.2654 5.85777 20.2654 7.57894 19.2038 8.64052L9 18.5L4 20L5.5 15Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EditIcon;
