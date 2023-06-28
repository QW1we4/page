"use client";

import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/layout";
import { SALE_NFT_ADDRESS, mintNftContract } from "@/web3/web3.config";

const SaleNft: NextPage = () => {
  const [saleStatus, setSaleStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { account } = useContext(AppContext);

  const getSaleStatus = async () => {
    try {
      const response: boolean = await mintNftContract.methods
        .isApprovedForAll(account, SALE_NFT_ADDRESS)
        .call();

      setSaleStatus(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickSaleStatus = async () => {
    try {
      setIsLoading(true);

      const response = await mintNftContract.methods
        .setApprovalForAll(SALE_NFT_ADDRESS, !saleStatus)
        .send({ from: account });

      if (Number(response.status) === 1) {
        setSaleStatus(!saleStatus);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!account) return;

    getSaleStatus();
  }, [account]);

  return (
    <div className="px-8 pt-16">
      <div className="flex items-center">
        판매 상태 :
        {account ? (
          <>
            {isLoading ? (
              <span className="ml-2 animate-spin">🔴</span>
            ) : saleStatus ? (
              <span className="text-green-400 ml-2">승인</span>
            ) : (
              <span className="text-red-400 ml-2">거부</span>
            )}
            <button
              className="ml-1 text-xs btn-style font-bold"
              onClick={onClickSaleStatus}
            >
              상태 변경
            </button>
          </>
        ) : (
          <span className="text-gray-400 ml-2">로그인 후 확인하세요.</span>
        )}
      </div>
    </div>
  );
};

export default SaleNft;
