import { FC } from "react";

interface BottomNavProps {}

export const BottomNav: FC<BottomNavProps> = ({}) => {
  return (
    <nav className="py-4 w-full flex justify-around items-center fixed bottom-0 bg-neutral-800 text-white">
      <ul>
        <li>Hi</li>
      </ul>
    </nav>
  );
};
