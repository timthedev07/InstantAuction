import { IconType } from "@react-icons/all-files/lib";
import { capitalize } from "client-controllers";
import { FC } from "react";
import ReactTooltip from "react-tooltip";

interface NavbarItemProps {
  navData: {
    route: string;
    name: string;
    icon: IconType;
  };
}

export const NavbarItem: FC<NavbarItemProps> = ({ navData }) => {
  return (
    <>
      <ReactTooltip />
      <li className="nav-item" data-tip={capitalize(navData.name)}>
        <a href={navData.route}>
          <navData.icon />
        </a>
      </li>
    </>
  );
};
