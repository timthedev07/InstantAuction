import { FC } from "react";
import { FaHome, FaUser } from "react-icons/fa";

const LINKS = [
  {
    route: "/",
    name: "home",
    icon: FaHome
  },
  {
    route: "/me",
    name: "me",
    icon: FaUser
  }
];

interface NavProps {}

export const Nav: FC<NavProps> = ({}) => {
  return (
    <nav>
      <ul>
        {LINKS.map(each => (
          <li>
            <a href={each.route}>
              <each.icon />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
