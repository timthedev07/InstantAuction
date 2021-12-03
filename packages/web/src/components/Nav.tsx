import { FC } from "react";
import { BiUser } from "@react-icons/all-files/bi/BiUser";
import { BiFolder } from "@react-icons/all-files/bi/BiFolder";

const LINKS = [
  {
    route: "/me",
    name: "me",
    icon: BiUser
  },
  {
    route: "/your-stuff",
    name: "your-stuff",
    icon: BiFolder
  }
];

interface NavProps {}

export const Nav: FC<NavProps> = ({}) => {
  return (
    <nav className="flex border-b border-white items-center">
      <a href="/">
        <img src="/logo192.png" className="w-9 h-9" />
      </a>
      <ul className="flex items-center justify-around p-3">
        {LINKS.map(each => (
          <li key={each.name}>
            <a href={each.route}>
              <each.icon />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
