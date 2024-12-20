const { ethers } = require("hardhat");

async function main() {
    const AttendanceToken = await ethers.getContractFactory("AttendanceToken");
    const contract = await AttendanceToken.deploy();
    await contract.deployed();

    console.log("Contract deployed to:", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
