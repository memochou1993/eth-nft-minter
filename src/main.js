import { ethers } from 'ethers';
import { abi as ERC721ABI } from '../build/contracts/ERC721NFT.json';
import { abi as ERC1155ABI } from '../build/contracts/ERC1155NFT.json';
import api from './api';

const {
  VITE_ERC721_CONTRACT_ADDRESS,
  VITE_ERC1155_CONTRACT_ADDRESS,
} = import.meta.env;

const ERC721SyncButton = document.getElementById('erc721-sync');
const ERC721MintButton = document.getElementById('erc721-mint');
const ERC721ResyncButton = document.getElementById('erc721-resync');
const ERC721List = document.getElementById('erc721-list');
const ERC1155SyncButton = document.getElementById('erc1155-sync');
const ERC1155MintButton = document.getElementById('erc1155-mint');
const ERC1155ResyncButton = document.getElementById('erc1155-resync');
const ERC1155List = document.getElementById('erc1155-list');

class App {
  constructor() {
    this.init();
  }

  async init() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const [account] = await provider.send('eth_requestAccounts');
    const signer = provider.getSigner();
    this.ERC721Contract = new ethers.Contract(VITE_ERC721_CONTRACT_ADDRESS, ERC721ABI, signer);
    this.ERC1155Contract = new ethers.Contract(VITE_ERC1155_CONTRACT_ADDRESS, ERC1155ABI, signer);

    await this.fetchTokens(account);
    await this.renderTokens(ERC721List, 'ERC721');
    await this.renderTokens(ERC1155List, 'ERC1155');

    setInterval(() => this.fetchTokens(account), 1000 * 10);
    setInterval(() => this.renderTokens(ERC721List, 'ERC721'), 1000 * 10);
    setInterval(() => this.renderTokens(ERC1155List, 'ERC1155'), 1000 * 10);
  
    ERC721SyncButton.addEventListener('click', () => this.syncContract(VITE_ERC721_CONTRACT_ADDRESS));
    ERC721MintButton.addEventListener('click', () => this.mintToken(this.ERC721Contract));
    ERC721ResyncButton.addEventListener('click', () => this.resyncTokens(VITE_ERC721_CONTRACT_ADDRESS, 'ERC721'));
    ERC1155SyncButton.addEventListener('click', () => this.syncContract(VITE_ERC1155_CONTRACT_ADDRESS));
    ERC1155MintButton.addEventListener('click', () => this.mintToken(this.ERC1155Contract));
    ERC1155ResyncButton.addEventListener('click', () => this.resyncTokens(VITE_ERC1155_CONTRACT_ADDRESS, 'ERC1155'));
    document.body.removeAttribute('hidden');
  }

  async mintToken(contract) {
    const tokenURI = 'https://raw.githubusercontent.com/memochou1993/nft-leopard-cat-images/main/output/metadata/';
    const res = await contract.mintNFT(tokenURI);
    await res.wait();
  }

  async syncContract(account) {
    await api.syncContract(account);
  }

  async fetchTokens(account) {
    const { result } = await api.fetchTokens(account);
    this.tokens = result;
  }

  async renderTokens(list, type) {
    if (!this.tokens) return;
    if (this.tokens.length === list.childElementCount) return;
    list.textContent = '';
    this.tokens
      .filter((t) => t.metadata)
      .filter((t) => t.contract_type === type)
      .map((t) => JSON.parse(t.metadata))
      .forEach(({ name, image }) => {
        const img = document.createElement('img');
        img.alt = name;
        img.src = image;
        list.appendChild(img);
      });
  }

  async resyncTokens(contract, type) {
    if (!this.tokens) return;
    this.tokens
      .filter((t) => !t.metadata)
      .filter((t) => t.contract_type === type)
      .forEach((t) => api.resyncToken(contract, t.token_id));
  }
}

window.onload = () => new App();
