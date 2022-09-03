// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ERC1155NFT is ERC1155URIStorage, Ownable {
    mapping(address => uint8) balances;

    uint256 tokenCount = 0;

    constructor() ERC1155("") {}

    function mintNFT(string memory _tokenURI)
        public
        returns (uint256)
    {
        require(balances[msg.sender] < 100);
        balances[msg.sender]++;
        tokenCount++;
        _mint(msg.sender, tokenCount, 10, "");
        _setURI(tokenCount, string(abi.encodePacked(_tokenURI, Strings.toString(tokenCount))));
        return tokenCount;
    }
}
