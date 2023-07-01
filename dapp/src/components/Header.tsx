"use client";

import { AppContext } from "@/app/layout";
import { CHAIN_ID_MUMBAI, ethereum, web3 } from "@/lib/web3.config";
import { FC, useContext, useState } from "react";

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { account, setAccount } = useContext(AppContext);

  const onClickLogIn = async () => {
    try {
      const accounts: any = await ethereum?.request({
        method: "eth_requestAccounts",
        params: [],
      });

      setAccount(accounts[0]);

      if (parseInt(ethereum.networkVersion) !== CHAIN_ID_MUMBAI) {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Mumbai",
              chainId: web3.utils.numberToHex(CHAIN_ID_MUMBAI),
              nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
              rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
            },
          ],
        });
      }
    } catch (error) {
      console.error(error);
    }
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
