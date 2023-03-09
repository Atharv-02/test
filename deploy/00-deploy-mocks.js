const { network } = require('hardhat');
const {
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
} = require('../helper-hardhat-config');
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  // console.log(chainId, network.name);
  // console.log(DECIMALS, INITIAL_ANSWER);
  if (developmentChains.includes(network.name)) {
    console.log('Local Network Detected! Deploying Mocks');
    await deploy('MockV3Aggregator', {
      contract: 'MockV3Aggregator',
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_ANSWER],
    });
    log('Mocks Deployed');
    log('-----------------------------------------------------------------');
  }
};
module.exports.tags = ['all', 'mocks'];
