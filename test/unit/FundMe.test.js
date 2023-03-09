const { assert, expect } = require('chai');
const { deployments, ethers, getNamedAccounts } = require('hardhat');

describe('FundMe', () => {
  let fundMe;
  let deployer;
  let mockV3Aggregator;
  beforeEach(async () => {
    //deploy our fund me contract
    //using hardhat deploy

    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(['all']);
    fundMe = await ethers.getContract('FundMe', deployer);
    mockV3Aggregator = await ethers.getContract('MockV3Aggregator', deployer);
  });

  describe('constructor', () => {
    it('Sets the aggregator addresses correctly', async () => {
      const response = await fundMe.priceFeed();
      assert.equal(response, mockV3Aggregator.address);
    });
    it('Fails if you donot send enough ETH', async () => {
      await expect(fundMe.fund()).to.be.revertedWith(
        'You need to spend more ETH!'
      );
    });
  });
});
