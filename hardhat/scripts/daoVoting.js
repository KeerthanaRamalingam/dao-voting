const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy the VotingToken contract
    const VotingToken = await ethers.getContractFactory("VotingToken");
    const initialSupply = ethers.parseEther("1000000"); // 1 million tokens

    const votingToken = await VotingToken.deploy(initialSupply);
    const votingTokenDeployment = await votingToken.waitForDeployment();
    console.log("VotingToken contract deployed to:", votingToken.target);

    // Deploy the DaoVoting contract with the VotingToken address
    const DaoVoting = await ethers.getContractFactory("DaoVoting");
    const daoVoting = await DaoVoting.deploy(votingToken.target);
    const daoVotingDeployment = await daoVoting.waitForDeployment();
    console.log("DaoVoting contract deployed to:", daoVoting.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
