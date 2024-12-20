/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.28",
  networks: {
    eduChainTestnet: {
      url: "https://rpc.open-campus-codex.gelato.digital",  // Edu Chain RPC URL
      chainId: 656476,  // Edu Chain Testnet's chain ID
      accounts: [`0x32b701576dc1af741c5b4f312ce1d9d79003035d9d4d9a5a7e2e6062fd4e9209`],  // Use private key from .env file
    },
  },
};