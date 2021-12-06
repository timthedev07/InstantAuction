import { FC } from "react";
import { LINKS } from "./Nav";

interface BottomNavProps {}

export const BottomNav: FC<BottomNavProps> = ({}) => {
  return (
    <nav className="w-full flex justify-around items-center fixed bottom-0 bg-neutral-800 text-white">
      <ul className="flex items-center w-full justify-center gap-5 p-3 float-right">
        {LINKS.map(each => (
          <li key={each.name} className="nav-item">
            <a href={each.route}>
              <each.icon />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
