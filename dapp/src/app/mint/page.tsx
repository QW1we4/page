"use client";

import { NextPage } from "next";
import { useContext, useState } from "react";
import { INft, PINATA_URL, mintNftContract } from "@/web3/web3.config";
import { AppContext } from "../layout";
import axios from "axios";
import Image from "next/image";

const Mint: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newNft, setNewNft] = useState<INft | null>(null);

  const { account } = useContext(AppContext);

  const onClickMint = async () => {
    try {
      setIsLoading(true);
      setNewNft(null);

      const mintResponse = await mintNftContract.methods
        .mintNft()
        .send({ from: account });

      if (Number(mintResponse.status) === 1) {
        const myNftResponse = await mintNftContract.methods
          .getLatestNft(account)
          .call();

        const tokenId = Number(myNftResponse);

        const metadataResponse = await axios.get(
          `${PINATA_URL}/${tokenId}.json`
        );

        setNewNft({
          tokenId,
          name: metadataResponse.data.name,
          description: metadataResponse.data.description,
          image: metadataResponse.data.image,
          attributes: metadataResponse.data.attributes,
        });
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  return (
    <main className="px-8 pt-16">
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
        {newNft && (
          <div>
            <div>새로운 다덴부를 획득했습니다!!!</div>
            <Image
              className="mt-2"
              src={newNft.image}
              width={200}
              height={200}
              alt="NFT"
              loading="lazy"
            />
            <div className="mt-2">
              <span className="font-bold mr-2">이름</span>
              {newNft.name}
              <span className="font-bold mx-2">설명</span>
              {newNft.description}
            </div>
            <div className="mt-2">
              <div className="font-bold mr-2">속성</div>
              {newNft.attributes.map((v, i) => {
                return (
                  <>
                    <span className="font-bold">{v.trait_type}</span>
                    <span className="mx-2">{v.value}</span>
                  </>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Mint;
