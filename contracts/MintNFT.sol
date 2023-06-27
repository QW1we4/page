// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MintNft is ERC721Enumerable, Ownable {
    string metadataUri;

    uint nftMaxAmount;

    constructor(string memory _name, string memory _symbol, string memory _metadataUri, uint _nftMaxAmount) ERC721(_name, _symbol) {
        metadataUri = _metadataUri;
        nftMaxAmount = _nftMaxAmount;
    }

    function mintNft() public onlyOwner {
        uint tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);
    }

    function batchMint(uint _amount) public {
        for(uint i; i < _amount; i++) {
            mintNft();
        }
    }

    function tokenURI(uint _tokenId) public override view returns(string memory) {
        return string(abi.encodePacked(metadataUri,'/', Strings.toString(_tokenId), '.json'));
    }

    function getLatestNft(address _nftOwner) public view returns(uint) {
        uint nftLength = balanceOf(_nftOwner);
        uint latestNft = tokenOfOwnerByIndex(_nftOwner, nftLength - 1);

        return latestNft;
    }

    function getAllNft(address _nftOwner) public view returns(uint[] memory) {
        uint nftLength = balanceOf(_nftOwner);

        uint[] memory allNfts = new uint[](nftLength); 

        for(uint i; i < nftLength; i++) {
            allNfts[i] = tokenOfOwnerByIndex(_nftOwner, i);
        }

        return allNfts;
    }
}