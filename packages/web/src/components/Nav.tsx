import { FC } from "react";
import { BiUser } from "@react-icons/all-files/bi/BiUser";
import { BiFolder } from "@react-icons/all-files/bi/BiFolder";

const LINKS = [
  {
    route: "/your-stuff",
    name: "your-stuff",
    icon: BiFolder
  },
  {
    route: "/me",
    name: "me",
    icon: BiUser
  }
];

interface NavProps {}

export const Nav: FC<NavProps> = ({}) => {
  return (
    <nav className="flex border-b border-opacity-30 border-neutral-1000 items-center bg-neutral-800">
      <a href="/" className="px-6">
        <img src="/logo192.png" className="w-9 h-9" />
      </a>
      <ul className="flex items-center w-full justify-end gap-5 p-3 float-right">
        {LINKS.map(each => (
          <li
            key={each.name}
            className="flex items-center justify-center w-14 h-9 p-3 rounded-full transition-all duration-300 hover:bg-gray-800 hover:bg-opacity-60 cursor-pointer"
          >
            <a href={each.route}>
              <each.icon />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
