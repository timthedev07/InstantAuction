import { FC } from "react";
import { BsPersonFill } from "@react-icons/all-files/bs/BsPersonFill";
import { RiAuctionFill } from "@react-icons/all-files/ri/RiAuctionFill";
import { TiHome } from "@react-icons/all-files/ti/TiHome";
import { NavbarItem } from "./NavbarItem";

export const LINKS = [
  {
    route: "/",
    name: "home",
    icon: TiHome
  },
  {
    route: "/auctions",
    name: "auctions",
    icon: RiAuctionFill
  },
  {
    route: "/me",
    name: "me",
    icon: BsPersonFill
  }
];

interface NavProps {}

export const Nav: FC<NavProps> = ({}) => {
  return (
    <nav className="flex border-b border-opacity-30 border-neutral-1000 items-center bg-neutral-800">
      <a href="/" className="px-6">
        <img src="/logo192.png" className="w-9 h-9" />
      </a>
      <ul className="flex items-center w-full justify-end gap-5 p-3 float-right pr-10">
        {LINKS.slice(1).map(each => (
          <NavbarItem navData={each} />
        ))}
      </ul>
    </nav>
  );
};
