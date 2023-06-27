import { FC, ReactNode } from "react";

interface SideMenuProps {
  children: ReactNode;
}

const SideMenu: FC<SideMenuProps> = ({ children }) => {
  return (
    <div className="bg-green-100 min-h-screen flex">
      <nav className="bg-blue-100 w-60 shrink-0">SideMenu</nav>
      {children}
    </div>
  );
};

export default SideMenu;
