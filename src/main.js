import { ethers } from 'ethers';
import { abi } from '../build/contracts/ERC721NFT.json';

const { VITE_CONTRACT_ADDRESS } = import.meta.env;

const render = async () => {
  list.textContent = '';
  const balance = await contract.balanceOf(account);
  const iteratee = (i) => contract.tokenOfOwnerByIndex(account, i);
  const promises = [...Array(Number(balance)).keys()].map(iteratee);
  const tokens = await Promise.all(promises);
  tokens.forEach((token) => {
    const image = document.createElement('img');
    image.src = getTokenURI(token);
    list.appendChild(image);
  });
};

const mintNFT = async () => {
  const res = await contract.mintNFT();
  await res.wait();
  render();
};

const getTokenURI = (token) => `https://github.com/memochou1993/nft-leopard-cat-images/blob/main/output/${token}.png?raw=true`;

const button = document.getElementById('mint-nft');
const list = document.getElementById('token-list');

const provider = new ethers.providers.Web3Provider(window.ethereum);
const [account] = await provider.send('eth_requestAccounts');
const signer = provider.getSigner();
const contract = new ethers.Contract(VITE_CONTRACT_ADDRESS, abi, signer);

button.addEventListener('click', mintNFT);

render();

document.body.removeAttribute('hidden');
