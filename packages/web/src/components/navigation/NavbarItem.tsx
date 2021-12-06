import { IconType } from "@react-icons/all-files/lib";
import { capitalize } from "client-controllers";
import { FC, useState } from "react";
import Tooltip from "react-power-tooltip";

interface NavbarItemProps {
  navData: {
    route: string;
    name: string;
    icon: IconType;
  };
}

export const NavbarItem: FC<NavbarItemProps> = ({ navData }) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <li
      key={navData.name}
      className="nav-item relative"
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <a href={navData.route}>
        <navData.icon />
      </a>
      <Tooltip
        show={show}
        position="bottom center"
        arrowAlign="center"
        backgroundColor="var(--color-primary-500)"
        color="white"
        textBoxWidth="100px"
        fontSize="6px"
      >
        <span>{capitalize(navData.name)}</span>
      </Tooltip>
    </li>
  );
};
