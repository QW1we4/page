"use client";

import { INftMetadata, PINATA_URL } from "@/web3/web3.config";
import axios from "axios";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface NftCardProps {
  tokenId: number;
}

const NftCard: FC<NftCardProps> = ({ tokenId }) => {
  const [nft, setNft] = useState<INftMetadata | null>(null);

  const getNft = async () => {
    try {
      const metadataResponse = await axios.get(`${PINATA_URL}/${tokenId}.json`);

      setNft({
        name: metadataResponse.data.name,
        description: metadataResponse.data.description,
        image: metadataResponse.data.image,
        attributes: metadataResponse.data.attributes,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNft();
  }, []);

  return (
    <>
      {nft ? (
        <div className="mb-8">
          <Image
            className="mt-2"
            src={nft.image}
            width={200}
            height={200}
            alt="NFT"
            loading="lazy"
          />
          <div className="mt-2">
            <span className="font-bold mr-2">이름</span>
            {nft.name}
            <span className="font-bold mx-2">설명</span>
            {nft.description}
          </div>
          <div className="mt-2">
            <div className="font-bold mr-2">속성</div>
            {nft.attributes.map((v, i) => {
              return (
                <>
                  <span className="font-bold">{v.trait_type}</span>
                  <span className="mx-2">{v.value}</span>
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <div>로딩중입니다...</div>
      )}
    </>
  );
};

export default NftCard;
