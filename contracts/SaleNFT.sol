// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./MintNft.sol";

contract SaleNft is Ownable {
    MintNft mintNftContract;

    constructor(address _mintNftAddress) {
        mintNftContract = MintNft(_mintNftAddress);
    }

    mapping(uint => uint) public nftPrices;

    uint[] public onSaleNft;


    function setSaleNft(uint _tokenId, uint _price) public {
        address nftOwner = mintNftContract.ownerOf(_tokenId);

        require(nftOwner == msg.sender);
        require(mintNftContract.isApprovedForAll(nftOwner, address(this)));
        require(_price > 0);
        require(nftPrices[_tokenId] == 0);

        nftPrices[_tokenId] = _price;
        onSaleNft.push(_tokenId);
    }

    function cancelSaleNft(uint _tokenId) public {
        address nftOwner = mintNftContract.ownerOf(_tokenId);

        require(nftOwner == msg.sender);
        require(nftPrices[_tokenId] > 0);

        nftPrices[_tokenId] = 0;

        arrangeOnSaleNft();
    }

    function purchaseNft(uint _tokenId)public payable {
        uint nftPrice = nftPrices[_tokenId];
        address tokenOwner = mintNftContract.ownerOf(_tokenId);

        require(nftPrice > 0);
        require(nftPrice <= msg.value);
        require(tokenOwner != msg.sender);

        uint tradeFee = msg.value / 20;
        payable(tokenOwner).transfer(msg.value - tradeFee);
        payable(owner()).transfer(tradeFee);
        mintNftContract.safeTransferFrom(tokenOwner, msg.sender, _tokenId);
        nftPrices[_tokenId] = 0;

        arrangeOnSaleNft();
    }

    function getNftPrice(uint _tokenId) public view returns(uint) {
        return nftPrices[_tokenId];
    }

    function getOnSaleNft() public view returns(uint[] memory) {
        return onSaleNft;
    }

    function arrangeOnSaleNft() public {
        for(uint i = 0; i < onSaleNft.length; i++) {
            if(nftPrices[onSaleNft[i]] == 0) {
                onSaleNft[i] = onSaleNft[onSaleNft.length - 1];

                onSaleNft.pop();
            }
        }
    }
}
