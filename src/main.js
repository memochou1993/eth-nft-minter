import { ethers } from 'ethers';
import { abi } from '../build/contracts/ERC721NFT.json';

const { VITE_CONTRACT_ADDRESS } = import.meta.env;

const render = async () => {
  //
};

const mintNFT = async () => {
  const tokenURI = 'https://raw.githubusercontent.com/memochou1993/nft-leopard-cat-images/main/output/metadata/';
  const res = await contract.mintNFT(tokenURI);
  await res.wait();
  render();
};

const button = document.getElementById('mint-nft');

const provider = new ethers.providers.Web3Provider(window.ethereum);
const [account] = await provider.send('eth_requestAccounts');
const signer = provider.getSigner();
const contract = new ethers.Contract(VITE_CONTRACT_ADDRESS, abi, signer);

button.addEventListener('click', mintNFT);

render();

document.body.removeAttribute('hidden');
