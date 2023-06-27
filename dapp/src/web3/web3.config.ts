import Web3 from "web3";
import { MetaMaskSDK } from "@metamask/sdk";
import MINT_NFT_ABI from "@/web3/mintNftAbi.json";
import SALE_NFT_ABI from "@/web3/saleNftAbi.json";

const MINT_NFT_ADDRESS = "0xF4210B594c7A0ddDe6Efde8034CDCb64C5975eE5";
const SALE_NFT_ADDRESS = "0xd4789afB7c517a7cA125f4A89fAa0f6e89fC80EA";

export const CHAIN_ID_MUMBAI = 80001;

export const MMSDK = new MetaMaskSDK();

export const ethereum = MMSDK.getProvider();

export const web3 = new Web3(ethereum);

export const mintNftContract = new web3.eth.Contract(
  MINT_NFT_ABI,
  MINT_NFT_ADDRESS
);
export const saleNftContract = new web3.eth.Contract(
  SALE_NFT_ABI,
  SALE_NFT_ADDRESS
);

export const PINATA_URL =
  "https://olbm.mypinata.cloud/ipfs/QmU52T5t4bXtoUqQYStgx39DdXy3gLQq7KDuF1F9g3E9Qy";

export interface INft {
  tokenId: number;
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}
