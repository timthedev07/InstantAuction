import { FC } from "react";

interface NavProps {}

export const Nav: FC<NavProps> = ({}) => {
  return (
    <div>
      THIS IS THE NAV
      <ol>
        <li>HOME</li>
        <li>YOUR ACCOUNT</li>
      </ol>
    </div>
  );
};
