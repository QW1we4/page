"use client";

import { NextPage } from "next";
import { useContext, useState } from "react";
import { mintNftContract } from "@/web3/web3.config";
import { AppContext } from "../layout";
import NftCard from "@/components/NftCard";

const Mint: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokenId, setTokenId] = useState<number>();

  const { account } = useContext(AppContext);

  const onClickMint = async () => {
    try {
      setIsLoading(true);

      const mintResponse = await mintNftContract.methods
        .mintNft()
        .send({ from: account });

      if (Number(mintResponse.status) === 1) {
        const myNftResponse = await mintNftContract.methods
          .getLatestNft(account)
          .call();

        setTokenId(Number(myNftResponse));
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  return (
    <div className="px-8 pt-16">
      <div className="flex items-center">
        지금 바로 나만의 다덴부를 획득해 보세요
        {account ? (
          <button className="btn-style ml-2 font-bold" onClick={onClickMint}>
            민팅하기
          </button>
        ) : (
          <div className="flex items-center">
            <button
              className="line-through btn-style ml-2 font-bold"
              onClick={onClickMint}
            >
              민팅하기
            </button>
            <div className="text-xs font-normal ml-2">
              (지갑로그인을 해주세요!)
            </div>
          </div>
        )}
      </div>
      <div className="mt-8">
        {isLoading && <div>로딩중입니다...</div>}
        {tokenId && (
          <div>
            <div>새로운 다덴부를 획득했습니다!!!</div>
            <NftCard tokenId={tokenId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Mint;
