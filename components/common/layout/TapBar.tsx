"use client";

import { logoutAction } from "@/actions/user";
import {
  ChatPageIcon,
  HomePageIcon,
  RankPageIcon,
  UserPageIcon,
} from "@/assets/icons";

export default function TabBar() {
  const menu = [
    {
      id: 1,
      icon: <HomePageIcon />,
      onClick: () => {},
    },
    {
      id: 2,
      icon: <ChatPageIcon />,
      onClick: () => {},
    },
    {
      id: 3,
      icon: <RankPageIcon />,
      onClick: () => {},
    },
    {
      id: 4,
      icon: <UserPageIcon />,
      onClick: () => {
        logoutAction();
      },
    },
  ];
  return (
    <div className="fixed bottom-0 h-16 flex flex-row justify-between w-full md:w-sm items-center border-t border-zinc-300 bg-white">
      {menu.map((item) => (
        <button
          key={item.id}
          className="h-full w-full cursor-pointer flex justify-center items-center "
          onClick={item.onClick}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}
