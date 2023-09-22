// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.



const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.deployed();

  console.log("Marketplace contract deployed to:", marketplace.address);

  // Store the contract addresses for later use
  const addresses = {
    marketplace: marketplace.address,
  };

  // Store the contract addresses in a JSON file for easy access
  const fs = require("fs");
  fs.writeFileSync("deployedAddresses.json", JSON.stringify(addresses, null, 2));
  console.log("Contract addresses written to deployedAddresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });