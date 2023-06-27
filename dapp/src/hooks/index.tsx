import { useState } from "react";
import { MetaMaskSDK } from "@metamask/sdk";

export const useMetamask = () => {
  const [account, setAccount] = useState<string>("");

  const getAccount = async () => {
    try {
      const MMSDK = new MetaMaskSDK();

      const ethereum = MMSDK.getProvider();

      const accounts: any = await ethereum?.request({
        method: "eth_requestAccounts",
        params: [],
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return { account, setAccount, getAccount };
};
