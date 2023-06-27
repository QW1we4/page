import Link from "next/link";
import { FC, ReactNode } from "react";

interface SideMenuProps {
  children: ReactNode;
}

const SideMenu: FC<SideMenuProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <nav className="bg-pink-100 bg-opacity-80 w-60 shrink-0 py-8 pl-4 flex flex-col justify-between">
        <div className="text-2xl font-black px-4 py-2 rounded-lg shadow-lg w-fit">
          프로젝트 다덴부
        </div>
        <div className="grow pt-12 flex">
          <Link href="/">
            <button className="btn-style">Dadenbu ???</button>
          </Link>
          <Link href="/mint">
            <button className="btn-style">민팅하기</button>
          </Link>
        </div>
        <div className="text-gray-600">Created by h662.</div>
      </nav>
      {children}
    </div>
  );
};

export default SideMenu;
