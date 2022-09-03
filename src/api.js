const {
  VITE_ERC721_CONTRACT_ADDRESS,
  VITE_ERC1155_CONTRACT_ADDRESS,
  VITE_MORALIS_API_URL,
  VITE_MORALIS_API_KEY,
} = import.meta.env;

const request = (url, method) => {
  return fetch(url, { method, headers: { 'X-API-Key': VITE_MORALIS_API_KEY } });
};

const syncContract = (contract) => {
  console.log('Syncing contract...');
  const url = `${VITE_MORALIS_API_URL}/nft/${contract}/sync?chain=goerli`;
  return request(url, 'PUT');
};

const fetchTokens = async (account) => {
  console.log('Fetching tokens...');
  const url = `${VITE_MORALIS_API_URL}/${account}/nft?chain=goerli&token_addresses=${VITE_ERC721_CONTRACT_ADDRESS}&token_addresses=${VITE_ERC1155_CONTRACT_ADDRESS}`;
  const r = await request(url, 'GET');
  return await r.json();
};

const resyncToken = async (contract, tokenId) => {
  console.log('Resyncing token...');
  const url = `${VITE_MORALIS_API_URL}/nft/${contract}/${tokenId}/metadata/resync?chain=goerli&flag=metadata&mode=sync`;
  const r = await request(url, 'GET');
  return await r.json();
};

export default {
  syncContract,
  fetchTokens,
  resyncToken,
};
