require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.17",
  networks : {
    goerli:{
      url: 'https://eth-goerli.g.alchemy.com/v2/rpDbYhtGtm0CraFX0aI03cA78ytafU8q',
      accounts: ['44352a31a5d97a81262977e603a2603a486368afdcd5f1195870023f6dc2d174']
    }
  }
};
