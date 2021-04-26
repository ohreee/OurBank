const OurBank = artifacts.require("OurBank");

module.exports = function (deployer) {
  deployer.deploy(OurBank);
};
