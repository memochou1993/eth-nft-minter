// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ERC721NFT is ERC721URIStorage, Ownable {
    mapping(address => uint8) balances;

    uint256 tokenCount = 0;

    constructor() ERC721("ERC721NFT", "NFT") {}

    function mintNFT(string memory _tokenURI)
        public
        returns (uint256)
    {
        require(balances[msg.sender] < 100);
        balances[msg.sender]++;
        tokenCount++;
        _mint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, string(abi.encodePacked(_tokenURI, Strings.toString(tokenCount))));
        return tokenCount;
    }
}
