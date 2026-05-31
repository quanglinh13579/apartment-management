import type { SVGProps } from 'react';

type ChevronProps = SVGProps<SVGSVGElement>;

export function ChevronLeft({ width = 9, height = 15, ...props }: ChevronProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 9 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.5 1.5L1.5 7.5L7.5 13.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRight({ width = 9, height = 15, ...props }: ChevronProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 9 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.5 1.5L7.5 7.5L1.5 13.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
