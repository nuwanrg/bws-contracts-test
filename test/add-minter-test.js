require("dotenv").config();
const fs = require("fs");
const { ethers, Signer } = require("ethers");

//Add an address as a minter
async function addMinter() {
  const QUICKNODE_HTTP_ENDPOINT = process.env.QUICKNODE_HTTP_ENDPOINT;
  const contractAbi = fs.readFileSync("abi.json").toString();
  const privateKey = process.env.METAMASK_PRIVATEKEY;
  const NEW_MINTER_ADDRESS = "0x020d13a97de3a1bce11956fb974a2ffe216f72a1";

  console.log(QUICKNODE_HTTP_ENDPOINT);
  // Connect to the network
  const provider = new ethers.providers.JsonRpcProvider(
    QUICKNODE_HTTP_ENDPOINT
  );

  const contractAddress = process.env.NFT_CONTRACT_ADDRESS;

  // Create a signer
  let wallet = new ethers.Wallet(privateKey);
  let signer = wallet.connect(provider);

  // Create a contract instance
  let contract = new ethers.Contract(contractAddress, contractAbi, signer);

  try {
    // Define the Minter role hash as per the AccessControl in OpenZeppelin
    const MINTER_ROLE = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes("MINTER_ROLE")
    );

    const tx = await contract.grantRole(MINTER_ROLE, NEW_MINTER_ADDRESS);
    const receipt = await tx.wait();
    console.log(`Transaction hash: ${receipt.transactionHash}`);

    // List all minters after the new one has been added
    const minterCount = await contract.getRoleMemberCount(MINTER_ROLE);
    console.log(`Number of minters: ${minterCount.toString()}`);
    for (let i = 0; i < minterCount; i++) {
      const minter = await contract.getRoleMember(MINTER_ROLE, i);
      console.log(`Minter ${i + 1}: ${minter}`);
    }
  } catch (e) {
    console.log(e);
  }
}

addMinter();
