"use client";

import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "@/app/layout";
import { mintNftContract } from "@/web3/web3.config";
import { redirect } from "next/navigation";
import NftCard from "@/components/NftCard";

const MyNft: NextPage = () => {
  const [tokenIds, setTokenIds] = useState<number[]>();

  const { account } = useContext(AppContext);

  const getMyNfts = async () => {
    try {
      const response: BigInt[] = await mintNftContract.methods
        .getAllNft(account)
        .call();

      const tempArray = response.map((v) => {
        return Number(v);
      });

      setTokenIds(tempArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!account) {
      redirect("/");
    }
    getMyNfts();
  }, [account]);

  return (
    <div className="px-8 pt-16">
      {tokenIds?.reverse().map((v, i) => {
        return (
          <>
            <div className="text-xl font-bold">{i + 1}.</div>
            <NftCard key={i} tokenId={v} />
          </>
        );
      })}
    </div>
  );
};

export default MyNft;
