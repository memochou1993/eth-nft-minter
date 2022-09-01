const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const { PROVIDER_URL, PRIVATE_KEY } = process.env;

module.exports = {
  networks: {
    development: {
     host: '127.0.0.1',
     port: 7545,
     network_id: '*',
    },
    goerli: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, PROVIDER_URL),
      network_id: 5,
    },
  },
  compilers: {
    solc: {
      version: '0.8.13',
    },
  },
};
