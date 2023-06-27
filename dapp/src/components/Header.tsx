"use client";

import { useMetamask } from "@/hooks";
import { FC, useState } from "react";

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { account, setAccount, getAccount } = useMetamask();

  const onClickLogIn = () => {
    getAccount();
  };
  const onClickLogOut = () => {
    setAccount("");
    setIsOpen(false);
  };
  const onClickOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex justify-end py-4 pr-8 font-bold">
      {account ? (
        <div className="relative">
          <button className="btn-style" onClick={onClickOpen}>
            {account.substring(0, 6)}...{account.substring(account.length - 4)}
          </button>
          {isOpen && (
            <button
              className="absolute top-0 right-0 bg-white px-2 py-1 btn-style"
              onClick={onClickLogOut}
            >
              로그아웃
            </button>
          )}
        </div>
      ) : (
        <button className="btn-style" onClick={onClickLogIn}>
          지갑로그인
        </button>
      )}
    </header>
  );
};

export default Header;
