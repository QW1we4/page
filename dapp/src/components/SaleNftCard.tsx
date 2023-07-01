import { FC, useContext, useEffect, useState } from "react";
import NftCard from "./NftCard";
import { mintNftContract, saleNftContract, web3 } from "@/lib/web3.config";
import { AppContext } from "@/app/layout";
import { MyNftCardProps } from "./MyNftCard";

interface SaleNftCardProps extends MyNftCardProps {
  getSaleNfts: () => Promise<void>;
}

const SaleNftCard: FC<SaleNftCardProps> = ({ index, tokenId, getSaleNfts }) => {
  const [isMyNft, setIsMyNft] = useState<boolean>(false);
  const [price, setPrice] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { account } = useContext(AppContext);

  const getIsMyNft = async () => {
    try {
      const response: string = await mintNftContract.methods
        .ownerOf(tokenId)
        .call();

      setIsMyNft(response.toLowerCase() === account.toLowerCase());
    } catch (error) {
      console.error(error);
    }
  };

  const getPrice = async () => {
    try {
      const response = await saleNftContract.methods
        .getNftPrice(tokenId)
        .call();

      setPrice(Number(web3.utils.fromWei(Number(response), "ether")));
    } catch (error) {
      console.error(error);
    }
  };

  const onClickPurchase = async () => {
    try {
      if (!account || !price) return;

      setIsLoading(true);

      const response = await saleNftContract.methods
        .purchaseNft(tokenId)
        .send({ from: account, value: web3.utils.toWei(price, "ether") });

      if (Number(response.status) === 1) {
        getSaleNfts();
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPrice();
  }, []);

  useEffect(() => {
    getIsMyNft();
  }, [account]);

  return (
    <>
      <div className="font-bold">
        <span className="text-xl mr-2">{index + 1}.</span>
        {price && (
          <span>
            {price}
            <span className="text-xs text-purple-600">Matic</span>
          </span>
        )}
        {isMyNft ? (
          <span className="ml-2">(내 다덴부)</span>
        ) : account ? (
          <button className="btn-style" onClick={onClickPurchase}>
            구매
          </button>
        ) : (
          <button className="btn-style line-through">구매</button>
        )}
        {isLoading && <span className="ml-2">로딩중...</span>}
      </div>
      <NftCard tokenId={tokenId} />
    </>
  );
};

export default SaleNftCard;
