import React from 'react';

interface CalendarIconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

const CalendarIcon: React.FC<CalendarIconProps> = ({
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
      d="M4.75 8.91425H18.75M6.55952 3V4.54304M16.75 3V4.54285M16.75 4.54285H6.75C5.09315 4.54285 3.75 5.92436 3.75 7.62855V17.9143C3.75 19.6185 5.09315 21 6.75 21H16.75C18.4069 21 19.75 19.6185 19.75 17.9143L19.75 7.62855C19.75 5.92436 18.4069 4.54285 16.75 4.54285ZM19.75 15.0857H14.25M14.25 15.0857H9.25M14.25 15.0857V20.2285M14.25 15.0857V9.42858M9.25 15.0857H3.75M9.25 15.0857V20.2285M9.25 15.0857V9.42858"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CalendarIcon;
