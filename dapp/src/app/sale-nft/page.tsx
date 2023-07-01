"use client";

import SaleNftCard from "@/components/SaleNftCard";
import { saleNftContract } from "@/lib/web3.config";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const SaleNft: NextPage = () => {
  const [onSaleNft, setOnSaleNft] = useState<number[]>();

  const getSaleNfts = async () => {
    try {
      const response: bigint[] = await saleNftContract.methods
        .getOnSaleNft()
        .call();

      const tempArray = response.map((v, i) => {
        return Number(v);
      });

      setOnSaleNft(tempArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSaleNfts();
  }, []);

  return (
    <div className="px-8 pt-16">
      {onSaleNft?.length === 0
        ? "현재 판매중인 다덴부가 없습니다."
        : onSaleNft?.reverse().map((v, i) => {
            return (
              <SaleNftCard
                key={i}
                index={i}
                tokenId={v}
                getSaleNfts={getSaleNfts}
              />
            );
          })}
    </div>
  );
};

export default SaleNft;
