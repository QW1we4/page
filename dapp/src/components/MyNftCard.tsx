"use client";

import {
  ChangeEvent,
  FC,
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import NftCard from "./NftCard";
import { saleNftContract, web3 } from "@/lib/web3.config";
import { AppContext } from "@/app/layout";

interface MyNftCardProps {
  index: number;
  tokenId: number;
}

const MyNftCard: FC<MyNftCardProps> = ({ index, tokenId }) => {
  const [saleToggle, setSaleToggle] = useState<boolean>(false);
  const [salePrice, setSalePrice] = useState<string>("");
  const [currentPrice, setCurrnetPrice] = useState<number>();
  const [inputError, setInputError] = useState<string>("");

  const { account } = useContext(AppContext);

  const getCurrentPrice = async () => {
    try {
      const response = await saleNftContract.methods.nftPrices(tokenId).call();

      setCurrnetPrice(Number(web3.utils.fromWei(Number(response), "ether")));
    } catch (error) {
      console.error(error);
    }
  };

  const onClickSaleToggle = () => {
    setSaleToggle(!saleToggle);
  };

  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setSalePrice(e.target.value);
  };

  const onSubmitSalePrice: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();

      if (!salePrice) {
        setInputError("가격을 입력해주세요.");
        return;
      }

      if (isNaN(parseInt(salePrice))) {
        setInputError("숫자를 입력해주세요.");
        return;
      }

      const response = await saleNftContract.methods
        .setSaleNft(tokenId, web3.utils.toWei(salePrice, "ether"))
        .send({ from: account });

      if (Number(response.status)) {
        setCurrnetPrice(Number(salePrice));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickCancelSale = async () => {
    try {
      const response = await saleNftContract.methods
        .cancelSaleNft(tokenId)
        .send({ from: account });

      if (Number(response.status)) {
        setCurrnetPrice(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentPrice();
  }, []);

  return (
    <>
      <div className="font-bold">
        <span className="text-xl">{index + 1}.</span>
        {currentPrice ? (
          <span className="ml-2">
            판매중 : {currentPrice}
            <span className="text-xs text-purple-600">Matic</span>
            <button className="btn-style" onClick={onClickCancelSale}>
              취소
            </button>
          </span>
        ) : (
          <>
            {saleToggle && (
              <form className="inline-block ml-2" onSubmit={onSubmitSalePrice}>
                <input
                  className="shadow-xl rounded-md p-1 text-right focus:outline-none"
                  type="text"
                  value={salePrice}
                  onChange={onChangePrice}
                />
                <span className="text-xs text-purple-600">Matic</span>
                <input className="btn-style" type="submit" value="등록" />
              </form>
            )}
            <button className="btn-style" onClick={onClickSaleToggle}>
              {saleToggle ? "취소" : "판매하기"}
            </button>
            {inputError && (
              <span className="font-normal text-red-500 text-xs">
                {inputError}
              </span>
            )}
          </>
        )}
      </div>
      <NftCard tokenId={tokenId} />
    </>
  );
};

export default MyNftCard;
