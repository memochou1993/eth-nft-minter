const ERC721NFT = artifacts.require("ERC721NFT");
const ERC1155NFT = artifacts.require("ERC1155NFT");

module.exports = (deployer) => {
  deployer.deploy(ERC721NFT);
  deployer.deploy(ERC1155NFT);
};
