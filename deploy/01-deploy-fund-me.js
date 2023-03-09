//imports
//main
//calling

// function deployFunc(hre) {}
// module.exports.default = deployFunc;
// module.exports = async (hre) => {
//   const { getNamedAccounts, deployments } = hre;
// };
// ANOTHER WAY BELOW

const {
  networkConfig,
  developmentChains,
} = require('../helper-hardhat-config');
const { network } = require('hardhat');
const { verify } = require('../utils/verify');
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  let ethUsdPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get('MockV3Aggregator');
    // console.log(ethUsdAggregator);
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed'];
  }
  //if contract doesn't exist we deploy a local version of it for our testing
  //well what happens when we want to change chains
  //when going for localhost or hardhat network we want to use a mock

  const fundMe = await deploy('FundMe', {
    from: deployer,
    args: [ethUsdPriceFeedAddress], //put pricefeed address
    log: true,
    waitConfirmations: network.blockConfirmations || 1,
  });
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, [ethUsdPriceFeedAddress]);
  }
  console.log(
    '------------------------------------------------------------------------'
  );
};
module.exports.tags = ['all', 'fundme'];
