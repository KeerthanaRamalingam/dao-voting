require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    solidity: {
        compilers: [
            { version: "0.8.20" }
        ],
    },
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545",
        },
        testnet: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545",
            chainId: 97,
            gasPrice: 20000000000,
            accounts: ["18796c8f1bf1333e506e4a94bba5014bf35bb9e9edc2551c9c4d9bdc81703c21"]
          },
    },
};
