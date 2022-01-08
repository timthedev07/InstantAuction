import { FC, SVGProps } from "react";

export const InfoIcon: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      fill="none"
      height="24"
      {...props}
      stroke="currentColor"
      strokeLinecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle stroke="black" cx="12" cy="12" r="10" />
      <line stroke="black" x1="12" x2="12" y1="16" y2="12" />
      <line stroke="black" x1="12" x2="12" y1="8" y2="8" />
    </svg>
  );
};
