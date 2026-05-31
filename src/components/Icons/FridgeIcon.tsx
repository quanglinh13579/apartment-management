import type { SVGProps } from 'react';

type FridgeIconProps = SVGProps<SVGSVGElement> & {
  active?: boolean;
  activeColor?: string;
  inactiveColor?: string;
};

export function FridgeIcon({
  active = false,
  activeColor = '#333333',
  inactiveColor = '#5C5C5C',
  width = 24,
  height = 24,
  ...props
}: FridgeIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 8H15M5 11V14M5 4V5M1 3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V17C15 17.5304 14.7893 18.0391 14.4142 18.4142C14.0391 18.7893 13.5304 19 13 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V3Z"
        stroke={active ? activeColor : inactiveColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}