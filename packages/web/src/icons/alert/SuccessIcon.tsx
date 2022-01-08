import { FC, SVGProps } from "react";

const SuccessIcon: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      {...props}
      version="1.1"
      viewBox="0.0 0.0 450.1653543307087 451.4803149606299"
      fill="none"
      stroke="none"
      strokeLinecap="square"
      strokeMiterlimit="10"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="p.0">
        <path
          d="m0 0l450.16534 0l0 451.48032l-450.16534 0l0 -451.48032z"
          clipRule="nonzero"
        />
      </clipPath>
      <g clipPath="url(#p.0)">
        <path
          fill="#000000"
          fillOpacity="0.0"
          d="m0 0l450.16534 0l0 451.48032l-450.16534 0z"
          fillRule="evenodd"
        />
        <path
          fill="#23a77c"
          d="m0 225.08661l0 0c0 -124.3119 100.77471 -225.08661 225.08661 -225.08661l0 0c59.696686 0 116.94833 23.714415 159.16028 65.926346c42.211914 42.21193 65.92633 99.46359 65.92633 159.16026l0 0c0 124.31192 -100.77469 225.08661 -225.08661 225.08661l0 0c-124.3119 0 -225.08661 -100.77469 -225.08661 -225.08661z"
          fillRule="evenodd"
        />
        <path
          fill="#ffffff"
          d="m108.60104 240.29091l27.584793 -29.627563l65.90642 61.36113l142.11597 -152.64015l24.518799 22.827835l-169.70078 182.26773z"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
};

export default SuccessIcon;
