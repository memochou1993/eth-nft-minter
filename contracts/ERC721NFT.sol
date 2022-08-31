// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721NFT is ERC721URIStorage, Ownable {
    mapping(address => uint8) recipients;

    using Counters for Counters.Counter;
    Counters.Counter private tokenIds;

    constructor() ERC721("ERC721NFT", "NFT") {}

    function mintNFT(address _recipient, string memory _tokenURI)
        onlyOwner
        public
        returns (uint256)
    {
        require(recipients[_recipient] < 100);

        recipients[_recipient]++;

        tokenIds.increment();

        uint256 _newItemId = tokenIds.current();

        _mint(_recipient, _newItemId);

        _setTokenURI(_newItemId, _tokenURI);

        return _newItemId;
    }
}
