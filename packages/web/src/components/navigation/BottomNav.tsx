import Link from "next/link";
import { FC } from "react";
import { LINKS } from "./Nav";

interface BottomNavProps {}

export const BottomNav: FC<BottomNavProps> = ({}) => {
  return (
    <nav className="w-full flex justify-around items-center sticky bottom-0 bg-neutral-800 text-white">
      <ul className="flex items-center w-full justify-center gap-5 p-2 float-right">
        {LINKS.map(each => (
          <Link href={each.route} key={each.name}>
            <li className="nav-item">
              <each.icon />
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
