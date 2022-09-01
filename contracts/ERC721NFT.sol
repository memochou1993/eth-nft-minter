// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721NFT is ERC721Enumerable, Ownable {
    mapping(address => uint8) balances;

    uint256 tokenCount = 0;

    constructor() ERC721("ERC721NFT", "NFT") {}

    function mintNFT()
        public
        returns (uint256)
    {
        require(balances[msg.sender] < 100);
        balances[msg.sender]++;
        tokenCount++;
        _mint(msg.sender, tokenCount);
        return tokenCount;
    }
}
