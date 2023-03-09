const networkConfig = {
  5: {
    name: 'goerli',
    ethUsdPriceFeed: '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e',
  },
  137: {
    name: 'polygon',
    ethUsdPriceFeed: '0xDf3f72Be10d194b58B1BB56f2c4183e661cB2114',
  },
};
const developmentChains = ['hardhat', 'localhost'];
const DECIMALS = 8;
const INITIAL_ANSWER = 200000000000;
module.exports = { networkConfig, developmentChains, DECIMALS, INITIAL_ANSWER };
