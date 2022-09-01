import { ethers } from 'ethers';
import { abi } from '../build/contracts/ERC721NFT.json';

const {
  VITE_CONTRACT_ADDRESS,
  VITE_MORALIS_API_URL,
  VITE_MORALIS_API_KEY,
} = import.meta.env;

const request = (url) => {
  return fetch(url, { headers: { 'X-API-Key': VITE_MORALIS_API_KEY } }).then((r) => r.json());
};

const resync = (tokenId) => {
  console.log('Resyncing...');
  const url = `${VITE_MORALIS_API_URL}/nft/${VITE_CONTRACT_ADDRESS}/${tokenId}/metadata/resync?chain=goerli&flag=metadata&mode=sync`;
  return request(url);
};

const fetchTokens = (account) => {
  console.log('Fetching...');
  const url = `${VITE_MORALIS_API_URL}/${account}/nft?chain=goerli&token_addresses=${VITE_CONTRACT_ADDRESS}`;
  return request(url);
};

const render = async (account) => {
  const { result } = await fetchTokens(account);
  if (result && result.length === list.childElementCount) return;
  list.textContent = '';
  result
    .filter((r) => !r.metadata)
    .forEach((r) => resync(r.token_id));
  result
    .filter((r) => r.metadata)
    .map((r) => JSON.parse(r.metadata))
    .forEach(({ name, image }) => {
      const img = document.createElement('img');
      img.alt = name;
      img.src = image;
      list.appendChild(img);
    });
};

const mintNFT = async () => {
  const tokenURI = 'https://raw.githubusercontent.com/memochou1993/nft-leopard-cat-images/main/output/metadata/';
  const res = await contract.mintNFT(tokenURI);
  await res.wait();
};

const button = document.getElementById('mint-nft');
const list = document.getElementById('nft-list');

const provider = new ethers.providers.Web3Provider(window.ethereum);
const [account] = await provider.send('eth_requestAccounts');
const signer = provider.getSigner();
const contract = new ethers.Contract(VITE_CONTRACT_ADDRESS, abi, signer);

button.addEventListener('click', mintNFT);

render(account);
setInterval(() => render(account), 30000);

document.body.removeAttribute('hidden');
