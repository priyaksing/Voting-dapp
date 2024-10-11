// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// Contract deployed to : 0x70f41A6A442CFAAbE65BB8230762D2d19736Aef3

async function main() {
  const Voting = await hre.ethers.getContractFactory("Voting");

  /**
   * Contract is initialised with the Candidates data at the time of deployment.
   */
  const voting = await Voting.deploy(["Jennifer", "Meryl", "Emma", "Timothee"]);
  await voting.waitForDeployment();
  console.log("Contract deployed at :", await voting.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
