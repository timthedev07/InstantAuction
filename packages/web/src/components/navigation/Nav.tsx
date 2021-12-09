import { FC } from "react";
import { BsPersonFill } from "@react-icons/all-files/bs/BsPersonFill";
import { RiAuctionFill } from "@react-icons/all-files/ri/RiAuctionFill";
import { AiOutlineLoading } from "@react-icons/all-files/ai/AiOutlineLoading";
import { TiHome } from "@react-icons/all-files/ti/TiHome";
import { NavbarItem } from "./NavbarItem";
import { client, useMeQuery } from "client-controllers";

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

export const Nav: FC = () => {
  const { data, loading } = useMeQuery({ client: client });

  return (
    <nav className="sticky top-0 flex border-b border-opacity-30 border-neutral-1000 items-center bg-neutral-800">
      <a href="/" className="px-6">
        <img src="/logo192.png" className="w-9 h-9" />
      </a>
      <ul className="flex items-center w-full justify-end gap-5 p-3 float-right pr-10">
        {LINKS.slice(1, -1).map(each => (
          <NavbarItem key={each.name} navData={each} />
        ))}
        <li className="h-9">
          {loading || !data ? (
            <AiOutlineLoading className="animate-spin" />
          ) : !data!.me ? (
            <a href="/login">
              <button className="cyan-button">Sign in</button>
            </a>
          ) : (
            <img src={data!.me!.avatarUrl} className="w-9 h-9 rounded-full" />
          )}
        </li>
      </ul>
    </nav>
  );
};
