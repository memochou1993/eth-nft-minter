const {
  VITE_CONTRACT_ADDRESS,
  VITE_MORALIS_API_URL,
  VITE_MORALIS_API_KEY,
} = import.meta.env;

const request = (url) => {
  return fetch(url, { headers: { 'X-API-Key': VITE_MORALIS_API_KEY } }).then((r) => r.json());
};

const fetchTokens = (account) => {
  console.log('Fetching...');
  const url = `${VITE_MORALIS_API_URL}/${account}/nft?chain=goerli&token_addresses=${VITE_CONTRACT_ADDRESS}`;
  return request(url);
};

const resyncToken = (tokenId) => {
  console.log('Resyncing...');
  const url = `${VITE_MORALIS_API_URL}/nft/${VITE_CONTRACT_ADDRESS}/${tokenId}/metadata/resync?chain=goerli&flag=metadata&mode=sync`;
  return request(url);
};

export default {
  fetchTokens,
  resyncToken,
};
