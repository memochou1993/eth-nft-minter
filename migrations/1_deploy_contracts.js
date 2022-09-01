const ERC721NFT = artifacts.require("ERC721NFT");

module.exports = (deployer) => {
  deployer.deploy(ERC721NFT);
};
