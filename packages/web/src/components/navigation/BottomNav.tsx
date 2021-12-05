import { FC } from "react";

interface BottomNavProps {}

export const BottomNav: FC<BottomNavProps> = ({}) => {
  return (
    <nav className="py-5 w-full flex justify-around items-center fixed bottom-0 bg-black">
      <ul>
        <li>Hi</li>
      </ul>
    </nav>
  );
};
