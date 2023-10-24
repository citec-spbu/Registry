import { FC } from "react";
import { UserSidebarItem, UserSidebarItemSlug } from "../types/types";
import { sidebarItems } from "../static/sidebarItems";
import Link from "next/link";

interface UserSidebarProps {
  active?: UserSidebarItemSlug;
}

const UserSidebar: FC<UserSidebarProps> = ({ active = "hero" }) => {
  return (
    <ul className="flex flex-col gap-4">
      {sidebarItems.map((item) => (
        <li
          key={item.slug}
          className={`${active == item.slug ? "font-bold" : ""}`}
        >
          <Link href={"/user/" + item.slug}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default UserSidebar;
