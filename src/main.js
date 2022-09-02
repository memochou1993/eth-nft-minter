import { ethers } from 'ethers';
import { abi } from '../build/contracts/ERC721NFT.json';
import api from './api';

const {
  VITE_CONTRACT_ADDRESS,
} = import.meta.env;

const button = document.getElementById('mint-nft');
const list = document.getElementById('nft-list');

class App {
  constructor() {
    this.init();
    button.addEventListener('click', () => this.mintNFT());
  }

  async init() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const [account] = await provider.send('eth_requestAccounts');
    const signer = provider.getSigner();
    this.contract = new ethers.Contract(VITE_CONTRACT_ADDRESS, abi, signer);

    await this.fetchTokens(account);
    await this.renderTokens();
    await this.resyncTokens();
    setInterval(() => this.fetchTokens(account), 1000 * 10);
    setInterval(() => this.renderTokens(), 1000 * 10);
    setInterval(() => this.resyncTokens(), 1000 * 60);
  
    document.body.removeAttribute('hidden');
  }

  async fetchTokens(account) {
    const { result } = await api.fetchTokens(account);
    this.tokens = result;
  }

  async renderTokens() {
    if (!this.tokens) return;
    if (this.tokens.length === list.childElementCount) return;
    list.textContent = '';
    this.tokens
      .filter((t) => t.metadata)
      .map((t) => JSON.parse(t.metadata))
      .forEach(({ name, image }) => {
        const img = document.createElement('img');
        img.alt = name;
        img.src = image;
        list.appendChild(img);
      });
  };

  async resyncTokens() {
    if (!this.tokens) return;
    this.tokens
      .filter((t) => !t.metadata)
      .forEach((t) => api.resyncToken(t.token_id));
  }

  async mintNFT() {
    const tokenURI = 'https://raw.githubusercontent.com/memochou1993/nft-leopard-cat-images/main/output/metadata/';
    const res = await this.contract.mintNFT(tokenURI);
    await res.wait();
  };
}

window.onload = () => new App();
